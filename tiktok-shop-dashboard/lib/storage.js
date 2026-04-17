/**
 * Camada de armazenamento.
 * - Em produção (Vercel) usa Upstash Redis via @upstash/redis
 * - Em dev local, lê/grava no arquivo data.json
 *
 * Detecta automaticamente qual usar via variáveis de ambiente.
 *
 * As variáveis KV_REST_API_URL e KV_REST_API_TOKEN são injetadas
 * automaticamente pela Vercel quando você instala a integração
 * "Upstash Redis" pelo Marketplace.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const KEY = 'dashboard_data';
const DATA_FILE = path.join(process.cwd(), 'data.json');

// Detecta se Upstash Redis está configurado
const REDIS_ENABLED = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Cache em memória do default
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

// Cliente Upstash (lazy)
let _redis = null;
async function getRedis() {
  if (_redis) return _redis;
  const { Redis } = await import('@upstash/redis');
  _redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN
  });
  return _redis;
}

// ============================================================
// LEITURA
// ============================================================
export async function readData() {
  if (REDIS_ENABLED) {
    try {
      const redis = await getRedis();
      const stored = await redis.get(KEY);
      if (stored) return stored;
      // Primeira execução — semeia o Redis com o default
      const seed = await getDefault();
      await redis.set(KEY, seed);
      return seed;
    } catch (err) {
      console.error('[storage] Erro ao ler Redis, caindo para arquivo:', err);
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
  if (REDIS_ENABLED) {
    const redis = await getRedis();
    await redis.set(KEY, data);
    return { mode: 'redis' };
  }

  // Modo dev/local — escreve no arquivo
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  return { mode: 'file' };
}

// ============================================================
// FLAG ÚTIL PRA DEBUG
// ============================================================
export function getStorageMode() {
  return REDIS_ENABLED ? 'redis' : 'file';
}
