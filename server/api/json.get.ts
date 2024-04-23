import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
    const pathName = path.join(process.cwd(), 'public', 'database.json');
    var obj;
    obj = fs.readFileSync(pathName, 'utf8');
    return JSON.parse(obj);
})