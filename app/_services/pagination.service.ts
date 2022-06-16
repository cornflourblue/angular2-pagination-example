export interface IPagination<T> {
    totalItems: number,
    currentPage: number,
    pageSize: number,
    totalPages: number,
    startPage: number,
    endPage: number,
    startIndex: number,
    endIndex: number,
    range: Array<number>,
    pages: Array<T>
}

export class PaginationService {
    public getPager<T>(items: Array<T>, currentPage: number = 1, pageSize: number = 10): IPagination<T> {
        // calculate total pages
        const totalPages = Math.ceil(items.length / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        const startIndex: number = (currentPage - 1) * pageSize;
        const endIndex: number = Math.min(startIndex + pageSize - 1, items.length - 1);

        // create an array of pages to ng-repeat in the pager control
        const range: Array<number> = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        const pages: Array<T> = items.slice(startIndex, endIndex + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: items.length,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            range: range,
            pages: pages
        };
    }
}
