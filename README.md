# App Expo React Native com recursos de Autenticação usando Firebase

## Passo a passo

### Cadastro no Firebase, Instalações e Configurações

1. Explicar o que é o Firebase (BaaS - Back-End as a Service com diversas funcionalidades)
2. Entrar no site oficial e se cadastrar
3. Criar um novo projeto seguindo o passo a passo do site
    - app-auth
    - desativar analytics (não suporta pelo Expo Go, só Bare ou expo-dev-client)
    - criar
4. Adicionar Firebase ao aplicativo usando Web
    - Registrar (botar mesmo nome, app-auth)
    - Sem hosting
5. Usando as instruções desta tela (ou da doc Expo)
    - `npm install firebase` ou `npx expo install firebase`
    - Demora um pouco, então ir mostrando documentação e falando do firebaseConfig
    - Copiar código gerado nesta tela e colocar em um arquivo config/firebaseConfig.js
    - exportar o app para poder testar lá em Login
6. Entrar em Authentication
    - Vamos começar
    - Escolher e-mai/senha - Ativar/Salvar
    - Em Users, adicionar pelo menos 1
7. Voltar na Expo Doc do Firebase e falar sobre a necessidade de configurar bundler Metro (empacotador de JS do React Native)
    - Gerar o **metro.config.js**: `npx expo customize metro.config.js`
    - Substituir o conteúdo dele pelo indicado na documentação do Expo/Firebase

### Programação das telas

1. Em firebaseConfig, fazer import { getAuth } from "firebase/auth";
2. Em firebaseConfig, configurar e exportar o auth/getAuth
3. Em Login, terminar ajustes nos campos do formulário e botão (states, funções, eventos)
4. Fazer import do auth

---

## Documentação

**Expo - Using Firebase:** https://docs.expo.dev/guides/using-firebase/

**React Native Firebase:** https://rnfirebase.io/

**Firebase:**

-   Site oficial: https://firebase.google.com/
-   Documentação: https://firebase.google.com/docs
-   Autenticação: https://firebase.google.com/docs/auth/web/start
