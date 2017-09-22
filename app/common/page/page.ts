
export class Page {
    offset: number;
    rowcount: number;
    page: number;
    constructor(offset: number, rowcount: number, page?: number) {
        this.offset = offset;
        this.rowcount = rowcount;
        this.page = page;
    }
}