import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  filteredValues: any;

  subs = new Subscription();

  private searchTerms = new Subject<any>();

  get isPageReady(): boolean {
    return this.filteredValues && this.pagination;
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
      ).subscribe(response => {
        this.pagination = response;
        this.filteredValues = response.data;
      })
    );

    this.subs.add(
      this.searchTerms.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(
          (searchTerm: any) => {
            if (searchTerm.term.trim()) {
              return this.pagination.data
                .filter((row: any) => {
                  const stringified = JSON.stringify(row._columns[searchTerm.key]);
                  return row._columns[searchTerm.key] !== 'undefined' &&
                    (stringified.indexOf(searchTerm.term) >= 0 ||
                      stringified.toLocaleLowerCase().indexOf(searchTerm.term.toLocaleLowerCase()) >= 0);
                });
            } else {
              return this.pagination.data;
            }

          }
        )
      ).subscribe(values => this.filteredValues = values)
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  search(term: string, key: string): void {
    if (typeof key !== 'undefined') {
      this.searchTerms.next({ term: term, key: key });
    }
  }

}
