import {baseURL} from "~/utils";

export interface ICity {
    id: string,
    name: string,
    status: boolean
}

export class CityService {
    baseUrl = baseURL

    constructor() {

    }

    getList() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/city/list'), {
                    method: "POST",
                    body: {},
                    params: {
                        page: 1,
                        limit: -1,
                        fields: "id,name,status",
                        sort_by: "id_asc"
                    }
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }

    getDeatail(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/city/').concat(id), {
                    method: "GET"
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }
}