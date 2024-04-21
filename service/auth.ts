import {baseURL} from "~/utils";

export class User {
    phone: string
    password: string

    constructor(initial: { phone: string, password: string }) {
        this.phone = initial.phone
        this.password = initial.password
    }
}

export class AuthService {
    baseUrl = baseURL

    constructor() {

    }

    login(user: User) {
        return new Promise(async (resolve, reject) => {
            try {
                const result: { accessToken: string, } = await $fetch(this.baseUrl.concat('/partner/login'), {
                    method: "POST",
                    body: JSON.stringify(user),
                })
                if (result?.accessToken) {
                    const token = useCookie('accessToken')
                    const user = useCookie('user')
                    user.value = JSON.stringify(result)
                    token.value = result.accessToken
                }
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }

    register() {

    }

    static logout() {
        const token = useCookie('accessToken')
        token.value = ""
        useRouter().push('/login')
    }
}