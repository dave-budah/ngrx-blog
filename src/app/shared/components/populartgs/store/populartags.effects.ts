import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap} from "rxjs";
import {PopulartagService} from "../../../services/populartag.service";
import {popularTagsActions} from "./populartags.actions";
import {PopularTagType} from "../../../types/populartag.interface";

export const getPopularTagsEffect = createEffect((
  actions$ = inject(Actions),
  popularTagsService  = inject(PopulartagService)) => {
  return actions$.pipe(
    ofType(popularTagsActions.getPopularTags),
    switchMap(() => {
      return popularTagsService.getPopularTags().pipe(
        map((popularTags: PopularTagType[]) => {
          return popularTagsActions.getPopularTagsSuccess({popularTags})
        }),
        catchError(() => {
          return of(
            popularTagsActions.getPopularTagsFailure()
          )
        })
      )
    })
  )
}, { functional: true})
