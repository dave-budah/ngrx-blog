import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {articleActions} from "./store/article.actions";
import {selectCurrentUser} from "../authentication/store/auth.reducers";
import {selectArticleData, selectError, selectIsLoading} from "./store/article.reducers";
import {combineLatest, filter, map} from "rxjs";
import {CurrentUserInterface} from "../shared/types/currentuser.interface";
import {LoadingComponent} from "../shared/components/loading/loading.component";
import {ErrormessageComponent} from "../shared/components/errormessage/errormessage.component";
import {TaglistComponent} from "../shared/components/taglist/taglist.component";
import {StripTagsPipe} from "../shared/types/strip-tags.pipe";

@Component({
  selector: 'article',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrormessageComponent, TaglistComponent, StripTagsPipe],
  templateUrl: './article.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  // Here we are checking if the loggedin user is author of the article
  isAuthor$ = combineLatest({
  article: this.store.select(selectArticleData),
  currentUser: this.store.select(selectCurrentUser)
    .pipe(
      filter(
        (currentUser): currentUser is CurrentUserInterface | null => currentUser !== undefined
      )
    )
  }).pipe(
    map(({article, currentUser}) => {if(!article || !currentUser) {
      return false }
      return article.author.username === currentUser.username
}))
  // Here we are fetching the article
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$
  })
  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}))
  }
  deleteArticle() {
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}))
  }

}
