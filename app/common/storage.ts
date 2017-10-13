export class Storage {
    first: string;

    constructor(first: string) {
        this.first = first;
    }

    set(k: string, v: string) {
        if (typeof localStorage == 'undefined') { return; }
        localStorage.setItem(this.first + k, v);
    }

    get(k: string): any {
        if (typeof localStorage == 'undefined') { return; }
        if (localStorage.getItem(this.first + k)) {
            return localStorage.getItem(this.first + k);
        }
        return null;
    }

    setJSON(k: string, v: any) {
        if (typeof localStorage == 'undefined') { return; }
        localStorage.setItem(this.first + k, JSON.stringify(v));
    }

    getJSON(k: string): any {
        if (typeof localStorage == 'undefined') { return; }
        if (localStorage.getItem(this.first + k)) {
            return JSON.parse(localStorage.getItem(this.first + k));
        }
        return null;
    }
}
