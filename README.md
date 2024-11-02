# **Movemed**

O Movemed é uma solução desenvolvida para facilitar e gerenciar o processo de transferências de medicamentos e produtos entre as filiais de uma rede de farmácias. Este aplicativo simplifica o monitoramento das movimentações, permitindo melhor controle e transparência no transporte e entrega dos produtos.

## **Tecnologias e Técnicas Utilizadas**
* React Native: React Hooks para controle de estado e efeitos, componentes personalizados, Stack Navigator para navegação entre telas.
* Async Storage: Armazenamento local para dados do usuário logado.
* Axios: Consumo da API para requisições HTTP.
* TypeScript: Tipagem estática, incluindo interfaces para maior segurança e clareza no código.
* MapView: Exibição de rotas e monitoramento em mapas.
* Layout ajustado para iOS e Android.
* Postman para testes de conexão com a API.

## **Fluxograma**  
A navegação é baseada no tipo de usuário logado, ao fazer login cada usuário é direcionado ao seu fluxo específico.

<img src="https://github.com/user-attachments/assets/663e2d1b-3a06-41e2-92d8-dc3b3a7524e6" alt="img" width="300">


### Administrador  
O administrador tem permissão para ver a lista de produtos e gerenciar os usuários motoristas e filiais, podendo cadastrar, desativar e ativar conforme necessário.

<img src="https://github.com/user-attachments/assets/f2aae737-491b-49d4-a293-46f3f1dbc292" alt="img" width="300">

<img src="https://github.com/user-attachments/assets/9f3b81e6-56f6-4242-b9c8-712c7f4227b4" alt="img" width="300">

<img src="https://github.com/user-attachments/assets/5e188d3d-fe2d-49b5-b86b-4a7c35164f17" alt="img" width="300">

<img src="https://github.com/user-attachments/assets/f9bb39c4-86e6-4e71-ae3b-7f73cf74e703" alt="img" width="300">

<img src="https://github.com/user-attachments/assets/bf1ed23e-9f6c-427e-91f7-e66ead991c49" alt="img" width="300">


### Filiais  
As filiais tem acesso ao cadastro e visualização das movimentações.

<img src="https://github.com/user-attachments/assets/946d550e-547b-4139-adbe-9b7a69cc09ac" alt="img" width="300">

<img src="https://github.com/user-attachments/assets/bd597fde-fd79-430c-8d31-8a5194a1872f" alt="img" width="300">


### Motoristas  
Os motoristas tem acesso à lista de movimentações criadas pelas filiais, com opções relacionadas ao status de entrega de cada movimentação, além da visualização da rota no mapa.

<img src="https://github.com/user-attachments/assets/eac98a92-3fd0-4e76-9571-f83da714b53b" alt="img" width="300">

<img src="https://github.com/user-attachments/assets/d24a1a1b-b598-4f22-b85f-bbef6c614742" alt="img" width="300">


## **Como Executar**  
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


## **Melhorias Futuras**
* Modo Escuro (Dark Mode): Implementar um tema escuro para melhorar a acessibilidade.
* Custom Picker: Desenvolver um seletor customizado para consistência visual entre Android e iOS, especialmente na tela de cadastro de usuários.
* Validação de Email: Adicionar um campo para validação de email ao cadastrar novos usuários.
* Melhorar o layout da tela de listagem de usuários.
* Personalização de Cards: Alterar a cor dos cards de usuários conforme o tipo (Motorista ou Filial) para facilitar a identificação.
* Tela de Entregas: Implementar uma visualização do histórico das movimentações e progresso da rota em tempo real para o usuário.

### Anexos:

Quadro no Trello: https://trello.com/b/XhYSqOFb

Vídeo de apresentação: https://drive.google.com/file/d/1U-h10FlnUnJ2LtOIE4HdvvM7126JMT9t/view?usp=sharing

Apresentação no Canva: https://www.canva.com/design/DAGVLpvoWWw/VeLKx26SN2tdnjijlm59Sg/view?utm_content=DAGVLpvoWWw&utm_campaign=designshare&utm_medium=link&utm_source=editor
