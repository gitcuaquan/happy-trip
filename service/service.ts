import {baseURL} from "~/utils";

export class Service {
    baseUrl = baseURL

    constructor() {
    }

    getList() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/service/list'), {
                    method: "POST",
                    body: {},
                    params: {
                        page: 1,
                        limit: -1,
                    }
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }
}