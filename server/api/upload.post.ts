import path from "path";
import fs from "fs";
export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event)
    const paths: string[] = []
    files?.forEach((file) => {
        const fileName = Math.round(Math.random() * 1000000) + (file.filename || 'no-name.png')
        const filePath = path.join(process.cwd(), 'public','upload', fileName)
        fs.writeFileSync(filePath, file.data)
        paths.push(`/upload/${fileName}`)
    })
    return paths
})