import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app/app.routes";
import {provideState, provideStore} from "@ngrx/store";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import {authFeatureKey, authReducer} from "./app/authentication/store/auth.reducers";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import * as authEffects from "./app/authentication/store/auth.effects";
import * as feedEffects from "./app/shared/components/feed/store/feed.effects";
import * as popularTagsEffects from "./app/shared/components/populartgs/store/populartags.effects";
import * as addToFavoritesEffects from "./app/shared/components/reactions/store/reactions.effects";
import {provideEffects} from "@ngrx/effects";
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {authInterceptor} from "./app/shared/interceptors/auth.interceptor";
import {feedFeatureKey, feedReducer} from "./app/shared/components/feed/store/feed.reducers";
import {popularTagsFeatureKey, popularTagsReducer} from "./app/shared/components/populartgs/store/populartags.reducers";
import {AddtofavoriteService} from "./app/shared/components/reactions/services/addtofavorite.service";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      router: routerReducer
    }),
    provideRouterStore(),
    provideEffects(authEffects, feedEffects, popularTagsEffects, addToFavoritesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    AddtofavoriteService,
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
  ]
}
)
