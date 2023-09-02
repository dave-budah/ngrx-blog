import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {feedActions} from "./store/feed.actions";
import {combineLatest} from "rxjs";
import {selectError, selectFeedData, selectIsLoading} from "./store/feed.reducers";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TruncatePipe} from "../../types/truncate.pipe";
import {LoadingComponent} from "../loading/loading.component";
import {ErrormessageComponent} from "../errormessage/errormessage.component";
import {PaginationComponent} from "../pagination/pagination.component";
import {environment} from "../../../../environments/environment";
import queryString from 'query-string'
import {TaglistComponent} from "../taglist/taglist.component";
import {ReactionsComponent} from "../reactions/reactions.component";



@Component({
  selector: 'feed',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, LoadingComponent, ErrormessageComponent, PaginationComponent, TaglistComponent, ReactionsComponent],
  templateUrl: './feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';
  limit = environment.limit
  baseUrl = this.router.url.split('?')[0]
  currentPage: number = 0

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  })
  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page'] || '1')
      this.fetchFeed()
    })
  }
  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrl)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }))
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged = !changes['apiUrl'].firstChange && !changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue

    if (isApiUrlChanged) {
      this.fetchFeed()
    }
  }

}
