const express = require('express');

const path = require('path');

const readJsonData = require('./readFS');

const talkerPath = path.resolve(__dirname, 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (_request, response) => {
  const talkerData = await readJsonData(talkerPath);
  response.status(200).json(talkerData);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});