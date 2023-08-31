import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {popularTagsActions} from "./store/populartags.actions";
import {combineLatest} from "rxjs";
import {selectPopularTagsData} from "./store/populartags.reducers";
import {selectError, selectIsLoading} from "../feed/store/feed.reducers";
import {LoadingComponent} from "../loading/loading.component";
import {ErrormessageComponent} from "../errormessage/errormessage.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'populartags',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrormessageComponent, RouterLink],
  templateUrl: './populartags.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopulartagsComponent implements OnInit{
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  })
  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
  }

}
