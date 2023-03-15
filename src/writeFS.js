const fs = require('fs').promises;

const path = require('path');

const readJsonData = require('./readFS');

const talkerPath = path.resolve(__dirname, 'talker.json');

const addTalker = async (talker) => {
  try {
    const talkerData = await readJsonData(talkerPath);
    talkerData.push(talker);
    return await fs.writeFile(talkerPath, JSON.stringify(talkerData));
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addTalker;