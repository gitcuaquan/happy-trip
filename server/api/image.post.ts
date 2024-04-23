import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const _raw = body[0].split("/")
    const pathName = path.join(process.cwd(), 'public','upload',_raw[_raw.length - 1])
    fs.unlink(pathName, () => {
        return 200
    })
    return {body}
})