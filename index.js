const express = require('express');
const app = express();

//motor de renderização > ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('App rodando na porta http://localhost:8080');
});
