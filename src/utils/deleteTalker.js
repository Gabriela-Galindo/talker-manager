const fs = require('fs').promises;

const path = require('path');

const readJsonData = require('../readFS');

const talkerPath = path.resolve(__dirname, '../talker.json');

const deleteTalker = async (id) => {
    const talkerData = await readJsonData(talkerPath);
    const talkerById = talkerData.findIndex((talker) => talker.id === Number(id));
    talkerData.splice(talkerById, 1);
    await fs.writeFile(talkerPath, JSON.stringify(talkerData, null, 2));
};

module.exports = deleteTalker;