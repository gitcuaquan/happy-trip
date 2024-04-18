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