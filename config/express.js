const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');
const cors = require('cors');



module.exports = () => {
  const app = express();
  app.use(cors({
    origin: '*'
}));





  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
   });



  consign({cwd:'api'})
    .then('data')
    .then('routes')
    .then('images')
    .into(app)


  return app;
};