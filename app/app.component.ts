import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import {IPagination, PaginationService} from './_services/index'

interface DummyDataObject { name: string }

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private http: Http, private pagerService: PaginationService) { }

    // array of all items to be paged
    private allItems: DummyDataObject[];

    // pager object
    public pager: IPagination<DummyDataObject> = {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        startPage: 0,
        endPage: 0,
        startIndex: 0,
        endIndex: 0,
        pages: [],
    };

    // paged items
    pagedItems: DummyDataObject[];

    ngOnInit() {
        // get dummy data
        this.http.get('./dummy-data.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;

                // initialize to page 1
                this.setPage(1);
            });
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager<DummyDataObject>(this.allItems.length, page, 1);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
