import {Route} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {ProfileService} from "./profile.service";
import {provideState} from "@ngrx/store";
import {profileFeatureKey, profileReducer} from "./store/profile.reducers";
import * as profileEffects from "./store/profile.effects";
import {provideEffects} from "@ngrx/effects";

export const routes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    providers: [ProfileService,
      provideState(profileFeatureKey, profileReducer),
      provideEffects(profileEffects)
    ]
  }

]
