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
import * as projectsEffects from "./app/home/projects/store/effects";
import * as popularTagsEffects from "./app/shared/components/populartgs/store/populartags.effects";
import * as addToFavoritesEffects from "./app/shared/components/reactions/store/reactions.effects";
import {provideEffects} from "@ngrx/effects";
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {authInterceptor} from "./app/shared/interceptors/auth.interceptor";
import {feedFeatureKey, feedReducer} from "./app/shared/components/feed/store/feed.reducers";
import {popularTagsFeatureKey, popularTagsReducer} from "./app/shared/components/populartgs/store/populartags.reducers";
import {AddtofavoriteService} from "./app/shared/components/reactions/services/addtofavorite.service";
import {projectFeatureKey, projectReducer} from "./app/home/projects/store/reducer";
import {HIGHLIGHT_OPTIONS} from "ngx-highlightjs";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      router: routerReducer
    }),
    provideRouterStore(),
    provideEffects(authEffects, feedEffects, popularTagsEffects, addToFavoritesEffects, projectsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    AddtofavoriteService,
    provideState(authFeatureKey, authReducer),
    provideState(projectFeatureKey, projectReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        themePath: 'assets/styles/solarized-dark.css'
      }
    }
  ]
}
)
