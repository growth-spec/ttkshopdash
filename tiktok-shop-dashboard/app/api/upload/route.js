/**
 * POST /api/upload
 * Recebe uma imagem como FormData, sobe pro Vercel Blob, salva URL no Redis.
 *
 * Resposta:
 * { success: true, url: 'https://...vercel-storage.com/...' }
 */
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { readData, writeData } from '@/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Verifica se o token do Blob está configurado
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vercel Blob não configurado. Adicione a integração no painel Vercel → Storage.'
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, error: 'Nenhuma imagem enviada' },
        { status: 400 }
      );
    }

    // Validação básica de tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Imagem maior que 5MB' },
        { status: 400 }
      );
    }

    // Sobe para o Blob
    // addRandomSuffix:true garante nome único, evitando cache de URL antiga
    const blob = await put(file.name || 'product_img.png', file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type || 'image/png'
    });

    // Salva a URL no Redis junto com os outros dados
    const data = await readData();
    data.diagnosis_image_url = blob.url;
    await writeData(data);

    return NextResponse.json({ success: true, url: blob.url });
  } catch (err) {
    console.error('[upload] erro:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao fazer upload' },
      { status: 500 }
    );
  }
}
