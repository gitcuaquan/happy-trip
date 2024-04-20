export class Param {
    page?: number
    limit?: number
    sort_by?: string

    constructor(initial?: { page?: number, limit?: number, sort_by?: string }) {
        this.page = initial?.page || 1
        this.limit = initial?.limit || 10
        this.sort_by = initial?.sort_by || ""
    }
}

export class Pagination {
    count: number
    limit: number
    page: number
    total_page: number
}

export class FilterType {
    keyword?: string
    city_diemden?: string
    city_diemdon?: string
    from_date_of_destination?: string
    to_date_of_destination?: string
    have_partner?: boolean
    partner_creator_id?: string

    constructor(init?: {
        keyword?: string
        city_diemden?: string
        city_diemdon?: string
        from_date_of_destination: string | Date
        to_date_of_destination: string | Date
        have_partner?: boolean
        partner_creator_id?: string
    }) {

        this.keyword = init?.keyword || ""
        this.city_diemden = init?.city_diemden || ""
        this.city_diemdon = init?.city_diemdon || ""
        this.from_date_of_destination = init?.from_date_of_destination
        this.to_date_of_destination = init?.to_date_of_destination
        this.have_partner = init?.have_partner || false
        this.partner_creator_id = init?.partner_creator_id || ""

    }
}