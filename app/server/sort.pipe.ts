import { Pipe } from "@angular/core";

@Pipe({
    name: "sort"
})

export class SortPipe {
    transform(array: Array<any>, index: string): Array<string> {
        array.sort((a: any, b: any) => {
            if (a[index] < b[index]) {
                return -1;
            } else if (a[index] > b[index]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}