# TikTok Shop Dashboard (Next.js)

Dashboard simulando a Central de Criadores do TikTok Shop, com painel admin para personalização de métricas em tempo real.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Vercel KV** (banco Redis para persistência em produção)
- **PWA** instalável no celular

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Tela inicial (Home) com tabs Hoje / Últimos 7 dias |
| `/data` | Tela de dados com botões Hoje / Ontem / 7 dias |
| `/admin` | Painel admin com 3 abas, preview em iframes, botão Salvar |
| `/api/data` | API GET (lê) e POST (salva) os dados |

## Deploy

Veja **`DEPLOY.md`** para guia passo-a-passo (GitHub + Vercel + Vercel KV).

## Desenvolvimento local

```bash
npm install
npm run dev
```

Em modo dev sem KV configurado, o app lê/escreve direto no `data.json`.

## Estrutura

```
app/               # Pages e API routes
  layout.js        # Layout raiz (PWA meta tags + SW)
  page.js          # Home
  data/page.js     # Tela de Dados
  admin/page.js    # Painel Admin
  api/data/        # GET e POST dos dados

lib/
  format.js        # Formatação numérica (PT, EN, BRL, USD)
  storage.js       # Abstração KV (produção) / arquivo (dev)
  constants.js     # Configuração de métricas e períodos

public/            # Estáticos (CSS, ícones, manifest, SW)
data.json          # Seed inicial dos dados
```
