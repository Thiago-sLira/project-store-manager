const express = require('express');
const routes = require('./routes');
// const errorMap = require('./utils/errorMap');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes.productsRouter);

// app.use(errorMap);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
// abrindo pr
module.exports = app;