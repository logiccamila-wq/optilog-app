# Super Gestor - Plataforma de Gestão Inteligente

Super Gestor é uma plataforma de gestão de tarefas e conformidade, construída com Next.js, Firebase e Inteligência Artificial (Genkit). O projeto foi desenhado para organizar e monitorar fluxos de trabalho, garantindo conformidade com normas como a ISO 9001 e oferecendo insights inteligentes para otimização de processos.

## ✨ Funcionalidades Principais

-   **Fluxo de Atividades:** Acompanhe tarefas em tempo real, organizadas em um painel interativo.
-   **Criação de Tarefas:** Adicione novas atividades ao fluxo de trabalho de forma simples e rápida.
-   **Visualização de Conformidade:** Monitore o status de conformidade com a ISO 9001 através de um gráfico de pizza intuitivo.
-   **Insights com Supergestor IA:** Uma Inteligência Artificial integrada que analisa o fluxo de trabalho para identificar gargalos, sugerir otimizações e melhorar a eficiência geral.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** Next.js, React, TypeScript, Tailwind CSS
-   **Componentes:** shadcn/ui
-   **Backend & Banco de Dados:** Firebase (Authentication, Firestore)
-   **Inteligência Artificial:** Genkit / Google AI (Gemini)
-   **Hospedagem:** Firebase App Hosting

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### 1. Pré-requisitos

-   Node.js (v18 ou superior)
-   npm ou yarn

### 2. Clone o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO_GIT>
cd super-gestor
```

### 3. Instale as Dependências

```bash
npm install
```

### 4. Configure as Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto. Ele guardará suas chaves de API, que **não devem** ser enviadas para o GitHub.

Copie o conteúdo abaixo e preencha com suas próprias chaves:

```env
# Encontrado no seu console do Firebase (Configurações do Projeto -> Web Apps)
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="seu-projeto-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="seu-projeto.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="1:..."

# Encontrado no Google AI Studio ou Google Cloud Console
GEMINI_API_KEY="AIza..."

# Encontrado no Google Cloud Console (APIs & Services -> Credentials)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza..."
```

### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3001](http://localhost:3001).

## ☁️ Deploy (Publicação)

Este projeto está configurado para ser publicado na nuvem através do **Firebase App Hosting**. O processo é automatizado.

### 1. Conectar o Repositório do GitHub
- No console do Firebase, vá para **App Hosting**.
- Conecte o repositório do seu projeto.
- Configure o **Diretório raiz do app** para `/`.
- Configure a **Ramificação ativa** para `main` (ou a sua ramificação principal).

### 2. Configurar Variáveis de Ambiente
- Nas configurações do seu backend no App Hosting, adicione as mesmas variáveis de ambiente do seu arquivo `.env.local`. Isso é crucial para que as APIs (Google Maps, Genkit) funcionem online.

### 3. Iniciar o Deploy
- Após a configuração, qualquer `push` para a ramificação principal irá acionar um novo deploy automaticamente. O Firebase irá instalar as dependências, construir o projeto (`npm run build`) e publicá-lo online.
