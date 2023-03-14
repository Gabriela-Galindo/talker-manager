const fs = require('fs').promises;

const readJsonData = async (path) => {
    try {
        const data = await fs.readFile(path);
        return JSON.parse(data);
    } catch (e) {
        console.error(`Error reading: ${e}`);
    }
};

module.exports = readJsonData;