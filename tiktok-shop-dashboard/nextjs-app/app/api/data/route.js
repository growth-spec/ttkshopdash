import { NextResponse } from 'next/server';
import { readData, writeData, getStorageMode } from '@/lib/storage';

// Forçar execução em runtime Node (necessário para fs e @vercel/kv)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json({
      ...data,
      _storage: getStorageMode()
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || 'Erro ao ler dados' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
    }

    const result = await writeData(body);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao salvar' },
      { status: 500 }
    );
  }
}
