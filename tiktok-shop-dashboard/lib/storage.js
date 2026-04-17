/**
 * Camada de armazenamento.
 * - Em produção (Vercel) usa Vercel KV (banco Redis).
 * - Em dev local, lê/grava no arquivo data.json.
 *
 * Detecta automaticamente qual usar via variáveis de ambiente.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const KEY = 'dashboard_data';
const DATA_FILE = path.join(process.cwd(), 'data.json');

// Detecta se Vercel KV está configurado (variáveis injetadas pela Vercel)
const KV_ENABLED = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Cache em memória do default (lido do arquivo do projeto)
let defaultCache = null;
async function getDefault() {
  if (defaultCache) return defaultCache;
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    defaultCache = JSON.parse(raw);
  } catch {
    defaultCache = {};
  }
  return defaultCache;
}

// ============================================================
// LEITURA
// ============================================================
export async function readData() {
  if (KV_ENABLED) {
    try {
      const { kv } = await import('@vercel/kv');
      const stored = await kv.get(KEY);
      if (stored) return stored;
      // Primeira execução — semeia o KV com o default
      const seed = await getDefault();
      await kv.set(KEY, seed);
      return seed;
    } catch (err) {
      console.error('[storage] Erro ao ler KV, caindo para arquivo:', err);
      return await getDefault();
    }
  }

  // Modo dev/local — usa arquivo
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return await getDefault();
  }
}

// ============================================================
// ESCRITA
// ============================================================
export async function writeData(data) {
  if (KV_ENABLED) {
    const { kv } = await import('@vercel/kv');
    await kv.set(KEY, data);
    return { mode: 'kv' };
  }

  // Modo dev/local — escreve no arquivo
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  return { mode: 'file' };
}

// ============================================================
// FLAG ÚTIL PRA DEBUG
// ============================================================
export function getStorageMode() {
  return KV_ENABLED ? 'kv' : 'file';
}
