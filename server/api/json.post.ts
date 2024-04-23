import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const pathName = path.join(process.cwd(), 'public', 'database.json');
    await fs.writeFileSync(pathName, JSON.stringify(body))
    return {...body}
})