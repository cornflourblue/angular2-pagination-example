import { Component, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { PagerService } from './_services/index'

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    constructor(private pagerService: PagerService) { }

    // dummy array of items to be paged
    private dummyItems = _.range(1, 151);

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
        // initialize to page 1
        this.setPage(1);
    }

    setPage(page: number) {
        if (page < 1) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.dummyItems.length, page);

        // get current page of items
        this.pagedItems = this.dummyItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}