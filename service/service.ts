import { baseURL } from "~/utils";

export class Service {
    baseUrl = baseURL

    constructor() {
    }

    getList(callBack: Function) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/service/list'), {
                    method: "POST",
                    body: {
                        is_show: true
                    },
                    params: {
                        page: 1,
                        limit: -1,
                    }
                })
                resolve(result)
                callBack(result)
            } catch (e) {
                reject(e);
            }
        })
    }
}