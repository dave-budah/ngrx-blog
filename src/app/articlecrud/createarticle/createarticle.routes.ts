import {Route} from "@angular/router";
import {CreatearticleComponent} from "./createarticle.component";
import {CreatearticleService} from "./createarticle.service";
import {provideEffects} from "@ngrx/effects";
import * as createArticleEffects from "./store/createarticle.effects";
import {provideState} from "@ngrx/store";
import {createArticleFeatureKey, createArticleReducer} from "./store/createarticle.reducers";

export const routes: Route[]  = [
  {
    path: '',
    component: CreatearticleComponent,
    providers: [
      CreatearticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer)
    ]
  },
]
