# Projeto-DoaAcao
 
|             Nome              | NUSP    |
|:-----------------------------:|:-------:|
|Vinicius Kazuo Fujikawa Noguti | 11803121|
|Bruno Berndt Lima              | 12542550|
|Thiago Shimada                 | 12691032|
|Fernando Gonçalves Campos      | 12542352|
|Olavo Morais Borges Pereira    | 11297792|
|Igor Antunes Boson Paes        | 11200571|

## Visão geral do projeto
 O projeto DoaAção é o trabalho final para a disciplina de Engenharia de Software. Consiste em um site (posteriormente aplicativo) onde pessoas interessadas em se voluntariarem podem tanto oferecer seu tempo e informar quais o tipos de atividades estão dispostos a realizar quanto entidades filantrópicas e/ou pessoas podem cadastrar as vagas que possuem informando o tipo de trabalho a ser realizado para que os interessados em se voluntariar possam escolher.
 Uma pessoa pode buscar por atividades por vários critérios como causas com mais afinidade, habilidades que ele se acha proficiente, localização de oportunidades, entre outros. Posteriormente, um cliente possuirá também um histórico de atividades em que participou, a fim de permitir que clientes possam dar notas a outros clientes e a entidades.
 Uma entidade pode cadastrar atividades, selecionando as habilidades que seriam um diferencial que as pessoas que se inscrevem podem ter. Para cadastrar oportunidades, no entanto, uma entidade deve ter se registrado no sistema e ser verficada por um administrador. Oportunidades com muitos inscritos devem permitir que um gerenciador da mesma possa selecionar apenas alguns dos inscritos (função ainda não implementada) enviando uma mensagem aos que não foram selecionados. Após o fim de uma atividade, uma entidade pode encerrá-la e/ou avaliar os inscritos.

## Especificações
 O projeto foi construído utilizando o node JS, mais especificamente o framework React e algumas de suas bibliotecas. Para a parte de banco de dados, foi utilizado o MongoDB, juntamente do Mongoose para criação de esquemas.

### Como inicializar o site
 É necessário possuir o Node JS instalado na máquina e clonar o repositório localmente. Após esses dois passos, é necessário pelo terminal acessar a pasta onde foi baixado o repositório e dentro dela acessar a pasta servidor, onde o comando 
 ####"npm i --save" 
 deve ser rodado. Após finalizado, execute o comando "node index.js". Em seguida, retorne uma pasta e acesse a pasta projeto. Lá, execute novamente "npm i --save" e após finalizado execute o comando "npm start". Feitos todos esses passos, o site está pronto para ser utilizado.

### Observações
- Existem duas versões do projeto:
  
  - Com servidor: o servidor está funcional, sendo assim todos as interações com o banco de dados serão salvas. É necessário estar com o aplicativo do mongodb baixado e utilizar o comando "node index.js" no diretório "server". O servidor não possui dados, logo é necessário criá-los. (Branch principal)

  - Sem servidor: o servidor não foi utilizado, sendo assim as interações com o banco de dados não serão salvas. Como o servidor não foi utilizado apenas é necessário utilizar o comando "npm start" no diretório "projeto" para inicializar a aplicação. Essa versão utiliza dados fixos para permitir que sejam feitos testes, mas como não existe um banco de dados algumas funcionalidades podem não ser acessíveis apenas pela página inicial, podendo ser necessário alterar o link da página manualmente ou modificar o código para testá-las. (Branch cssWork)
