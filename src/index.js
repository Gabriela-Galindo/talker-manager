const express = require('express');

const path = require('path');

const tokenGenerator = require('crypto-random-string');

const readJsonData = require('./readFS');
const isValidLogin = require('./middlewares/loginValidation');
const { isNameValid, 
  isAgeValid, 
  isTalkValid, 
  isTokenValid, 
  isWatchedAtValid,
  isRateValid, 
  isWatchedAtDate } = require('./middlewares/talkerValidation');
const addTalker = require('./writeFS');

const talkerPath = path.resolve(__dirname, 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (_request, response) => {
  const talkerData = await readJsonData(talkerPath);
  response.status(HTTP_OK_STATUS).json(talkerData);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkerData = await readJsonData(talkerPath);
  const talkerById = talkerData.find((talker) => talker.id === Number(id));
  if (!talkerById) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/login', isValidLogin, (request, response) => {
  const token = tokenGenerator(16);
  return response.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', 
isTokenValid, isNameValid, isAgeValid, 
isTalkValid, isWatchedAtValid, 
isWatchedAtDate, isRateValid, async (request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const talkerData = await readJsonData(talkerPath);
  const newTalker = {
    id: talkerData.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  await addTalker(newTalker);
  return response.status(201).json(newTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});