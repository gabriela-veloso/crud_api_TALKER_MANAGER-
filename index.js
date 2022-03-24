const express = require('express');
const bodyParser = require('body-parser');
const searchTalker = require('./middlewares/searchTalker');
const getTalker = require('./middlewares/getTalker');
const getTalkerById = require('./middlewares/getTalkerById');
const deleteTalker = require('./middlewares/deleteTalker');
const { validateEmail, validatePassword, getToken } = require('./middlewares/login');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk, validateRate, validateWatched, addTalker } = require('./middlewares/postTalker');
  const {
    watchedValidate, 
    rateValidate, talkValidate, validateEditTalker } = require('./middlewares/editTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', getTalker);
app.get('/talker/search', validateToken, searchTalker);
app.get('/talker/:id', getTalkerById);
app.post('/login', validateEmail, validatePassword, getToken);
app.post('/talker',
validateToken, validateName, validateAge, validateTalk, validateRate, validateWatched, addTalker);
app.put('/talker/:id',
validateToken,
validateName, validateAge, talkValidate, watchedValidate, rateValidate, validateEditTalker);
app.delete('/talker/:id', validateToken, deleteTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});