import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  @Input() helpersService: any;

  @Input() service: any;

  @Input() requestService: any;

  @Input() route: any;

  @Input() columns: any;

  @Input() addLink: any;

  @Input() editLink: any;

  @Input() mapRow: any;

  @Input() title: string;

  pagination: any;

  subs = new Subscription();

  get isPageReady(): boolean {
    return this.pagination && true;
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subs.add(
      this.activatedRoute.queryParams.pipe(
        switchMap((params: Params) => {
          this.pagination = null;

          const paginate = {
            pageSize: +params['page-size'] || this.service.defaultPageSize,
            pageIndex: +params['page'] || 0
          };

          return this.requestService.makeGetRequest(this.route, `?page=${paginate.pageIndex}&per-page=${paginate.pageSize}`);
        }),
        map((pagination: any) => {
          for (const row of pagination.data) {
            row._columns = this.mapRow(row);
          }

          return pagination;
        })
      ).subscribe(response => this.pagination = response)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
