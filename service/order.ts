import {baseURL} from "~/utils";
import type {Param} from "~/service/types/filter";

export class IBooking {
    id?: string;
    customer?: {
        full_name?: string;
        phone?: string;
    };
    date_of_destination?: string;
    date_of_return?: string;
    short_id?: string;
    departure?: {
        city?: string;
        district?: string;
        country_code: string;
        country_name: string;
    };
    destination?: {
        city?: string;
        district?: string;
        country_code: string;
        country_name: string;
    };
    id_service?: string;
    service?: {
        id: string;
        name: string;
        description: string;
        service_type: number;
        service_name: string;
        transport_type: number;
        transport_name: string;
        prices: {
            departure: {
                city: string;
                district: string;
            };
            destination: {
                city: string;
                district: string;
            };
            price: number;
            price_guest: number;
            price_system: number;
        }[];
        price_system: number;
        includes_transport: {
            type: number;
            type_name: string;
        }[];
    };
    quantity?: number;
    price?: number;
    price_guest?: number;
    price_system?: number;
    sub_fee?: number;
    net_profit?: number;
    created?: string;
    updated?: string;
    status_type?: number;
    creator?: {
        user_id: string;
        user_phone: string;
        user_type: string;
    };
    status_name?: string;
}

export class OrderService {
    baseUrl = baseURL
    token = useCookie('accessToken')

    constructor() {

    }

    listOder(filter?: { param: Param, body: any }) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/order/list'), {
                    method: "POST",
                    body: JSON.stringify(filter?.body),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.token.value}`
                    },
                    params: filter?.param
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }

    preview(obj: IBooking) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/order/preview'), {
                    method: "POST",
                    body: obj,
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }

    createOrder(order: IBooking) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await $fetch(this.baseUrl.concat('/order/hook-v1'), {
                    method: "POST",
                    params: {
                        secret: "quankunsiphong"
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.token.value}`
                    },
                    body: {
                        quicker: order
                    },
                })
                resolve(result)
            } catch (e) {
                reject(e);
            }
        })
    }

}