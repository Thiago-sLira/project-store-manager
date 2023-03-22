const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes.productsRouter);

app.use('/sales', routes.salesRouter);

// Error como último no app
app.use(errorHandler);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
// abrindo pr
module.exports = app;