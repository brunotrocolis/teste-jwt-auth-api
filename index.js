const express = require('express');
const routes = require('./api/routes');

require('dotenv/config');

const app = express();

app.use(express.json())

routes(app);

app.listen(8080);