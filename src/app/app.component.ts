import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { PagerService } from "./_services/index";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private pagerService: PagerService) {}

  // array of all items to be paged
  private allItems: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    // get dummy data
    this.http.get("assets/dummy-data.json").subscribe(data => {
      // set items to json response
      this.allItems = data;

      // initialize to page 1
      this.setPage(1);
    });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
