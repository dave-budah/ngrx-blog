import {Route} from "@angular/router";
import {ArticleComponent} from "./article.component";
import {provideEffects} from "@ngrx/effects";
import * as articleEffects from "./store/article.effects"
import {provideState} from "@ngrx/store";
import {articleFeatureKey, articleReducer} from "./store/article.reducers";
import {ArticleService} from "./services/article.service";

export const routes:  Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
      ArticleService
    ]
  }
]
