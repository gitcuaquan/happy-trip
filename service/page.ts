import {baseURL} from "~/utils";
import type {Param} from "~/service/types/filter";
import {a} from "vite-node/index-O2IrwHKf";

export class Page {
    title?: string
    slug?: string
    status?: boolean
    content?: string
    thumbnail?: string
}

export class PageService {
    baseUrl = baseURL
    token = useCookie('accessToken')
    constructor() {
    }

    createPage(page: Page) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/page'), {
                    method: "POST",
                    body: page,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.token.value}`
                    }
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }
    getList(filter: {params:Param,body:any}){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/page/list'), {
                    method: "POST",
                    body: filter.body,
                    params: filter.params
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }
    getDetail(id: string){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/page/'+id), {
                    method: "GET",
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }
}