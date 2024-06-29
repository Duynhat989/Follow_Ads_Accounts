const path = require('path');
const fs = require('fs');
export const writeLogConsole = async (text = "") => {
    const dbPath = path.join('', "log.txt");
    fs.writeFileSync(dbPath, text + '\r\n', { flag: 'a' });
    return
}