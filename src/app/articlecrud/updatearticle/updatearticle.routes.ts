import {UpdatearticleComponent} from "./updatearticle.component";
import {UpdatearticleService} from "./updatearticle.service";
import {provideEffects} from "@ngrx/effects";
import * as updateArticleEffects from "./store/updatearticle.effects";
import {
  updateArticleFeatureKey,
  updateArticleReducer
} from "./store/updatearticle.reducers";
import {provideState} from "@ngrx/store";
import {Route} from "@angular/router";


export const routes: Route[]  = [
  {
    path: '',
    component: UpdatearticleComponent,
    providers: [
      UpdatearticleService,
      provideEffects(updateArticleEffects),
      provideState(updateArticleFeatureKey, updateArticleReducer)
    ]
  },
]
