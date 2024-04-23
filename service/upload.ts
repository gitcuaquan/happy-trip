export class UploadService {
    constructor() {
    }

    upload(file: File) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const form = new FormData()
                form.append("", file)
                const response = await $fetch("/api/upload", {
                    method: "POST",
                    body: form,
                })
                resolve(response)
            } catch (e) {
                reject(e);
            }
        })
    }
    delete(filepath:string) {
        return new Promise<void>(async (resolve, reject) => {
            try {

                const response = await $fetch("/api/image", {
                    method: "POST",
                    body: [filepath],
                })
                resolve(response)
            } catch (e) {
                reject(e);
            }
        })
    }
}