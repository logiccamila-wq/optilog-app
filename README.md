# Optilog App 🚚📱

Aplicativo Android desenvolvido em **Kotlin** com **Jetpack Compose** e integração ao **Firebase**.

## 📌 Funcionalidades
- Login e autenticação com Firebase
- Integração com rastreamento/logística
- Interface moderna usando Jetpack Compose

## 🛠️ Tecnologias
- [Kotlin](https://kotlinlang.org/)
- [Android Jetpack Compose](https://developer.android.com/jetpack/compose)
- [Firebase](https://firebase.google.com/)

## ▶️ Como rodar o projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/logiccamila-wq/optilog-app.git
# 🚀 Optilog

Uma plataforma para gestão de tarefas e compliance, com insights gerados por Inteligência Artificial para a empresa EJG.

---

## 🌐 Aplicação Online

Acesse a versão de produção em: **[https://ejgtransporte.com.br](https://ejgtransporte.com.br)**

---

## ✨ Funcionalidades Principais

- **Fluxo de Atividades**: Visualize e gerencie tarefas em tempo real.
- **Criação de Tarefas**: Adicione novas tarefas de forma rápida e intuitiva.
- **Visualização de Compliance ISO 9001**: Acompanhe o status de conformidade através de um gráfico de pizza interativo.
- **Insights com Supergestor IA**: A Inteligência Artificial analisa o fluxo de trabalho para identificar gargalos, sugerir otimizações e melhorar a eficiência.

---

## 🛠️ Tecnologias

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Componentes**: shadcn/ui
- **Backend & Banco de Dados**: Firebase (Auth, Firestore)
- **Inteligência Artificial**: Genkit / Google AI

---

## 🏗️ Estrutura do Projeto

```
/
├── src/
│   ├── app/         # Páginas e roteamento do Next.js
│   ├── components/  # Componentes React reutilizáveis
│   ├── ai/          # Fluxos e configurações de IA (Genkit)
│   ├── firebase/    # Configuração e hooks do Firebase
│   ├── lib/         # Funções utilitárias e dados
│   └── hooks/       # Hooks customizados
├── docs/            # Documentação do projeto
├── public/          # Arquivos estáticos
├── next.config.ts   # Configurações do Next.js
└── package.json     # Dependências e scripts
```

---

## 🚀 Como Rodar o Projeto Localmente

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/logiccamila-wq/optilog-app.git
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**
    Crie um arquivo `.env` na raiz do projeto e adicione as chaves do Firebase e do Google AI (Gemini).

    **Exemplo de `.env`**:
    ```env
    # Firebase - Encontrado no seu console do Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
    NEXT_PUBLIC_FIREBASE_APP_ID="1:..."

    # Google AI (Genkit / Gemini) - Encontrado no Google AI Studio
    GEMINI_API_KEY="AIza..."

    # Google Maps - Encontrado no Google Cloud Console
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza..."
    ```

4.  **Inicie o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```
    Por padrão, a aplicação rodará em `http://localhost:3001`.

5.  **Acesse no navegador**: `http://localhost:3001`

---

## ☁️ Deploy na Vercel

Siga estes passos para publicar a aplicação na Vercel:

1.  **Importe o Projeto no Vercel**
    *   Verifique se o projeto foi importado corretamente.
    *   Confirme que você selecionou o repositório correto do GitHub (**logiccamila-wq/optilog-app**).
    *   Certifique-se que a branch `main` (ou a que você deseja) está selecionada.

2.  **Configure o Build & Output**
    *   **Framework Preset**: `Next.js` (a Vercel geralmente detecta isso automaticamente).
    *   **Build Command**: `npm run vercel-build`.
    *   **Output Directory**: Deixe em branco. A Vercel detecta automaticamente o diretório `.next`.
    *   **Root Directory**: Deixe como `./` (raiz do repositório).

3.  **Adicione Variáveis de Ambiente**
    *   Configure as mesmas variáveis do seu arquivo `.env` em **Settings → Environment Variables** no painel da Vercel.
    *   Sem isso, o build pode falhar silenciosamente ou as funcionalidades que dependem de APIs externas não funcionarão.

4.  **Deploy**
    *   Clique em **Deploy**.
    *   Aguarde a conclusão para receber o link da sua aplicação.

5.  **Verifique os Logs em Caso de Falha**
    *   Se o deploy falhar, vá para **Deployments** → **View Logs** para identificar a causa do erro.

---

### 🚨 Guia de Troubleshooting: Resolvendo Erros Comuns na Vercel

Se a sua aplicação não está abrindo, verifique os erros mais comuns:

#### 1. Erros `404 NOT_FOUND`
O deploy ou a página não foi encontrada.

- **`DEPLOYMENT_NOT_FOUND`**: O deploy que você está tentando acessar não existe ou foi removido.
- **`SANDBOX_NOT_FOUND`**: O ambiente da função não está ativo, provavelmente porque o build falhou.
- **`RESOURCE_NOT_FOUND`**: Um recurso interno (como uma rota ou arquivo) não foi encontrado no projeto.

**O que fazer:**
- **Acesse o link direto do deploy**: No dashboard do Vercel, em **Deployments**, clique no último deploy e acesse o link de preview (ex: `optilog-app-git-main-logiccamila-wqs-projects.vercel.app`).
    - Se o link direto abrir, o problema pode ser o domínio principal.
    - Se não abrir, verifique se o projeto tem uma página inicial (`app/page.tsx`).
- **Verifique os Logs de Build** para encontrar erros de compilação no seu projeto.
- Garanta que existe um deploy com o status **Ready**. Se não houver, crie um novo.

#### 2. Erros de Função (`500`, `502`, `504`)
Acontecem quando uma API route ou função serverless falha.

- **`FUNCTION_INVOCATION_FAILED`**: A função executou, mas retornou um erro interno.
- **`FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE`**: O retorno da função é maior que o limite permitido pela Vercel.
- **`FUNCTION_THROTTLED`**: O limite de execuções simultâneas da função foi atingido.

**O que fazer:**
- Revise suas **API routes** ou **serverless functions**.
- Garanta que a função sempre retorne uma resposta válida (JSON, string, etc.) e que não exceda o limite de tamanho.

#### 💡 Resumo Rápido para Abrir o Optilog no Vercel sem 404:

1.  Abra o projeto **optilog-app** no dashboard do Vercel.
2.  Vá em **Deployments** e veja se há algum deploy com status **Ready**.
3.  Se não houver, clique em **New Deployment**.
4.  Confira os **logs de build** e corrija eventuais erros de código ou dependências.
5.  Use sempre o link público do deploy (`.vercel.app`) e não `localhost`.

Para uma lista exaustiva de todos os códigos de erro da Vercel, consulte o [guia de troubleshooting detalhado](./docs/VERCEL_TROUBLESHOOTING.md).

---

## 🎨 Guia de Estilo

- **Cor Primária**: Roxo Escuro (`#6A1B9A`)
- **Cor de Fundo**: Azul Marinho (`#0F0F1A`)
- **Cor de Destaque**: Laranja (`#FF9800`)
- **Fonte**: Inter (sans-serif)

