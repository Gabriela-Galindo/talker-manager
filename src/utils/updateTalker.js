const fs = require('fs').promises;

const path = require('path');

const readJsonData = require('../readFS');

const talkerPath = path.resolve(__dirname, '../talker.json');

const updateTalker = async (id, talker) => {
    try {
        const talkerData = await readJsonData(talkerPath);
        const { name, age, talk } = talker;
        const talkerById = talkerData.find((person) => person.id === Number(id));
        if (!talkerById) {
            return null;
        }
        talkerById.name = name;
        talkerById.age = age;
        talkerById.talk = talk;
        await fs.writeFile(talkerPath, JSON.stringify(talkerData));
        return talkerById;
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = updateTalker;