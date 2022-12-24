const PORTA = 8080;

//rotas
const express = require('express');
const app = express();

//database
const connection = require('./database/database')
connection
  .authenticate()
  .then(() => {
    console.log('Conexão realizada com sucesso!');
  })
  .catch((err) => {
    console.log('Conexão falhou, err: ' + err);
  });

const Pergunta = require('./database/Pergunta');

//motor de renderização - ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

//traduz os dados recebidos no formulário em um objeto capaz de ser lido
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas
app.get('/', (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [['id', 'DESC']] // ASC = Crescente || DESC = Decrescente
  }).then(perguntas => {
    res.render('index', {
      perguntas: perguntas
    });
  });

});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
  // recebe os dados do formulário
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  /*
    cria uma row dentro da tabela de perguntas
    contendo o conteúdo recebido
  */
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    // quando terminar ele redireciona pra tela principal
    res.redirect("/");
  });
});

app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id }
  });
});

app.listen(PORTA, () => {
  console.log('App rodando na porta http://localhost:' + PORTA);
});
