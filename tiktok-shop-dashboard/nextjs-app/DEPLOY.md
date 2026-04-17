# Guia de Deploy: Next.js + Vercel + Vercel KV

> **Tempo total:** 25–35 minutos
> **Custo:** R$ 0 (tudo no plano gratuito)
> **Resultado:** App rodando em HTTPS, instalável como PWA, com admin **funcionando online de verdade** (botão Salvar grava no banco)

---

## Visão geral do que você vai fazer

```
1. Criar conta no GitHub
2. Subir os arquivos no GitHub
3. Criar conta no Vercel (linkada ao GitHub)
4. Importar o projeto → Deploy inicial (vai funcionar mas o admin ainda não salva)
5. Criar o banco Vercel KV → Conectar ao projeto
6. Redeploy automático → admin passa a salvar
7. Instalar no celular como PWA
```

---

## Etapa 1 — Conta no GitHub

1. Acesse [github.com](https://github.com) → **Sign up**
2. Use seu email, escolha username e senha
3. Confirme o email
4. Quando perguntar plano, escolha **Free**

---

## Etapa 2 — Criar repositório e subir os arquivos

1. Logado no GitHub, clique em **"+"** (canto superior direito) → **"New repository"**
2. Configure:
   - **Repository name:** `tiktok-shop-dashboard` (ou o nome que quiser)
   - **Public** ✅ (precisa ser público para Vercel free)
   - **Add a README file** ✅
3. Clique em **"Create repository"**

Agora subir os arquivos:

4. Na página do repo, clique em **"Add file"** → **"Upload files"**
5. Arraste **TODA a pasta do projeto** (com as subpastas `app/`, `lib/`, `public/`) para a área de upload.

   > **Importante:** O GitHub aceita arrastar pastas inteiras. Mas se o navegador não aceitar, arraste os arquivos um a um mantendo a estrutura. A estrutura precisa ficar assim no GitHub:
   ```
   📁 tiktok-shop-dashboard/
   ├── 📁 app/
   │   ├── 📁 admin/page.js
   │   ├── 📁 api/data/route.js
   │   ├── 📁 data/page.js
   │   ├── layout.js
   │   └── page.js
   ├── 📁 lib/
   │   ├── constants.js
   │   ├── format.js
   │   └── storage.js
   ├── 📁 public/
   │   ├── (todos os ícones .png)
   │   ├── manifest.json
   │   ├── style.css
   │   └── sw.js
   ├── .gitignore
   ├── data.json
   ├── jsconfig.json
   ├── next.config.mjs
   ├── package.json
   └── DEPLOY.md
   ```

6. Aguarde upload completar
7. Em **"Commit changes"**, clique no botão verde **"Commit changes"**

---

## Etapa 3 — Conta no Vercel

1. Acesse [vercel.com](https://vercel.com) → **Sign Up**
2. Escolha **"Continue with GitHub"** (importante!)
3. Autorize o Vercel
4. Confirme o email se pedir
5. Plano: **Hobby** (gratuito)

---

## Etapa 4 — Importar e deployar

1. No painel do Vercel, clique em **"Add New..."** → **"Project"**
2. Encontre o repositório `tiktok-shop-dashboard` na lista → clique em **"Import"**
3. **Não mexa em nada** na tela de configuração — Vercel detecta automaticamente que é Next.js
4. Clique no botão azul **"Deploy"**
5. Aguarde 1–3 minutos (vai aparecer logs de build rolando)
6. Quando terminar, aparece tela de sucesso com fogos 🎉 e uma URL tipo `https://tiktok-shop-dashboard-xxxx.vercel.app`

**Teste agora:** abra a URL. As telas Início e Dados devem funcionar normalmente. O admin abre, mas se você clicar em **Salvar** vai dar erro — ainda falta criar o banco. Vamos lá.

---

## Etapa 5 — Criar o Vercel KV (banco de dados gratuito)

> Vercel KV é um banco Redis. Plano gratuito tem 256 MB e 30.000 requisições/mês. Para esse dashboard, é mais que suficiente para anos.

1. No painel do Vercel, abra seu projeto (clique no card)
2. Na barra superior do projeto, clique na aba **"Storage"**
3. Clique em **"Create Database"**
4. Selecione **"KV"** (Redis)

   > Dependendo da versão da interface, pode aparecer como **"Marketplace Database Providers"** → escolha **Upstash for Redis** (é a opção integrada). É gratuita.

5. Dê um nome ao banco: `tiktok-dashboard-db` (ou o que quiser)
6. Escolha a região mais próxima (qualquer uma serve, mas escolha algo como **Washington D.C. (iad1)** ou **São Paulo (gru1)** se aparecer)
7. Confirme. O banco é criado em segundos.
8. **Próxima tela importante:** vai perguntar se quer conectar ao projeto. Marque o projeto `tiktok-shop-dashboard` e confirme.

   > Isso adiciona automaticamente as variáveis de ambiente `KV_REST_API_URL` e `KV_REST_API_TOKEN` ao seu projeto. **Você não precisa copiar nada.**

---

## Etapa 6 — Forçar redeploy para o KV entrar em vigor

Variáveis de ambiente novas só passam a valer depois de um novo deploy. Vamos forçar:

1. No projeto Vercel, clique na aba **"Deployments"**
2. Encontre o deploy mais recente no topo da lista
3. Clique nos 3 pontinhos (⋯) à direita → **"Redeploy"**
4. Confirme o redeploy
5. Aguarde 1–2 minutos

**Pronto!** Agora abra a URL do app, vá em `/admin`, mude um número, clique em **Salvar**. Deve aparecer "Salvo com sucesso! (modo: kv)".

> Se o badge no topo do admin mostrar "Vercel KV" você está conectado ao banco. Se mostrar "arquivo local" significa que o KV ainda não foi conectado — refaça a Etapa 5.

---

## Etapa 7 — Instalar como PWA no celular

### Android (Chrome):
1. Abra a URL no Chrome do celular
2. Aparece banner **"Adicionar à tela inicial"** → toque em **Adicionar**
3. Se não aparecer: menu do Chrome (⋮) → **Instalar app**
4. Ícone aparece na tela inicial **na hora**

### iPhone (Safari):
1. Abra a URL **no Safari** (não funciona no Chrome do iPhone)
2. Botão de Compartilhar (□↑) → **Adicionar à Tela de Início**

---

## Como atualizar dados depois

Você tem **duas formas**:

### Forma 1 — Pelo admin online (recomendada)
Acesse `https://sua-url.vercel.app/admin` no computador. Edite os números, clique Salvar. Aparece nas duas telas (Início e Dados) imediatamente. **Não precisa de redeploy.**

### Forma 2 — Editando data.json no GitHub
Só funciona pra mudar o **valor inicial** (semente). Se já existem dados no KV, eles têm precedência. Para resetar tudo aos valores do `data.json`:

1. Vá no painel Vercel → projeto → Storage → seu banco KV
2. Aba **"Data Browser"**
3. Encontre a chave `dashboard_data` → delete
4. Próxima vez que abrir o app, ele recarrega do `data.json`

---

## Troubleshooting

**❓ "Build failed" no Vercel**
- Verifique se o `package.json` foi enviado pro GitHub
- Verifique se a estrutura de pastas (`app/`, `lib/`, `public/`) está intacta no repo

**❓ Admin mostra "arquivo local" e Salvar dá erro**
- O KV ainda não foi conectado ou o redeploy não rodou
- Vá em Settings → Environment Variables e verifique se existem `KV_REST_API_URL` e `KV_REST_API_TOKEN`
- Faça um novo deploy

**❓ "Botão Instalar não aparece no celular"**
- O navegador precisa ter o site aberto por uns 30 segundos antes de oferecer
- Force atualização (puxe pra baixo)
- No Chrome Android, vá em ⋮ → "Instalar app" manualmente

**❓ "Atualizei pelo admin mas o app no celular não atualiza"**
- O Service Worker está cacheando. Solução:
  1. Edite `/public/sw.js` no GitHub
  2. Mude `CACHE_VERSION = 'v1'` para `'v2'`
  3. Commit → Vercel reimplanta → app no celular pega versão nova

**❓ "Quero domínio próprio"**
- Vercel → Settings → Domains → adicione seu domínio. O Vercel te dá os registros DNS.

---

## Estrutura técnica (para referência)

```
Browser/PWA
   ↓ HTTP
Vercel (Next.js Edge)
   ↓
[Páginas estáticas pré-renderizadas]
   - / (home)
   - /data
   - /admin
   ↓
[API serverless]
   - GET /api/data  → lê do KV
   - POST /api/data → escreve no KV
   ↓
Vercel KV (Redis)
   - chave: dashboard_data
   - valor: JSON com today/yesterday/last_7_days
```

---

Boa sorte! 🚀
