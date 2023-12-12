import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {ProjectsFeedService} from "../../../services/projectsfeed.service";
import {feedActions} from "./actions";
import {catchError, map, of, switchMap} from "rxjs";
import {GetFeedResponseInterface} from "../types/getfeedresponse.interface";

export const getFeedEffect = createEffect(
  (
    actions$ = inject(Actions),
    feedService = inject(ProjectsFeedService)
  ) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({feed})
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure)
          })
        )
      })
    )
  },
  { functional: true }

)
