import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {feedActions} from "../store/actions";
import {Store} from "@ngrx/store";
import {combineLatest} from "rxjs";
import {selectError, selectFeedData, selectIsLoading} from "../store/reducer";
import {RouterLink} from "@angular/router";
import {ErrormessageComponent} from "../../../shared/components/errormessage/errormessage.component";
import {LoadingComponent} from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'pr-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrormessageComponent, LoadingComponent],
  templateUrl: './feed.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = ''

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  })

  constructor(private store: Store){}

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))

  }

}
