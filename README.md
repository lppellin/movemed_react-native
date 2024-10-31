**Movemed**

O Movemed é uma solução desenvolvida para facilitar e gerenciar o processo de transferências de medicamentos e produtos entre as filiais de uma rede de farmácias. Este aplicativo simplifica o monitoramento das movimentações, permitindo melhor controle e transparência no transporte e entrega dos produtos.

**Tecnologias e Técnicas Utilizadas**
* React Native: React Hooks para controle de estado e efeitos, componentes personalizados, Stack Navigator para navegação entre telas.
* Async Storage: Armazenamento local para dados do usuário logado.
* Axios: Consumo da API para requisições HTTP.
* TypeScript: Tipagem estática, incluindo interfaces para maior segurança e clareza no código.
* MapView: Exibição de rotas e monitoramento em mapas.
* Layout ajustado para iOS e Android.
* Postman para testes de conexão com a API.

**Fluxograma das Telas**
(Adicionar imagem do fluxograma das telas para melhor compreensão da estrutura do aplicativo)

**Como Executar**  
Certifique-se de ter o **NodeJS** previamente instalado (e o Android Studio caso use o emulador, ou o aplicativo Expo Go instalado no seu smartphone)
Vamos aos passos:
* Clone o repositório
* Abra no seu terminal de preferência (ou já na IDE) e instale as dependências com **npm install**
* Abra o projeto na sua IDE de preferência (caso não tenha já aberto no passo anterior) 
* Configure o **IP local** da sua máquina no arquivo **.env** para permitir o acesso pelo Expo, deixe a porta 3000
* Execute o app usando o **npx expo start** no terminal
Agora escolha a plataforma de sua preferência para visualizar o aplicativo:
* **Dispositivo físico (Android ou iOS)**: Abra o aplicativo **Expo Go** no seu dispositivo e escaneie o código QR gerado pelo **npx expo start** para rodar o app.
* **Emulador Android**: Após o comando **npx expo start**, pressione a tecla “**a**” para abrir o emulador do Android Studio para testar o app.

API
* Clone o repositório do backend em:
https://github.com/DEVinHouse-Clamed-V3/template_m1
* Abra no seu terminal de preferência e instale as dependências com **npm install**
* Inicie o servidor com **npm start**


**Melhorias Futuras**
* Modo Escuro (Dark Mode): Implementar um tema escuro para melhorar a acessibilidade.
* Custom Picker: Desenvolver um seletor customizado para consistência visual entre Android e iOS, especialmente na tela de cadastro de usuários.
* Validação de Email: Adicionar um campo para validação de email ao cadastrar novos usuários.
* Personalização de Cards: Alterar a cor dos cards de usuários conforme o tipo (Motorista ou Filial) para facilitar a identificação.
* Tela de Entregas: Implementar uma visualização do histórico das movimentações e progresso da rota em tempo real para o usuário.

Link do quadro no Trello: https://trello.com/invite/b/670eedf0f927a95a7515b8ea/ATTIe3b3ffe8f9ea6ad3620baa8a83b7831c722E1C67/projetofinalmodulo01

LINK DO VIDEO DE APRESENTAÇÃO
