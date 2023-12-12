import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap} from "rxjs";
import {AddtofavoriteService} from "../services/addtofavorite.service";
import {addToFavoritesActions} from "./reactions.actions";
import {ArticleInterface} from "../../../types/article.interface";

export const addToFavoritesEffect = createEffect((
  actions$ = inject(Actions),
  addtofavoriteService  = inject(AddtofavoriteService)) => {
  return actions$.pipe(
    ofType(addToFavoritesActions.addToFavorites),
    switchMap(({ isFavorited, slug }) => {
      const article$ = isFavorited ? addtofavoriteService.removeFromFavorites(slug) : addtofavoriteService.addToFavorites(slug)
      return article$.pipe(
        map((article: ArticleInterface) => {
          return addToFavoritesActions.addToFavoritesSuccess({article})
        }),
        catchError(() => {
          return of(
            addToFavoritesActions.addToFavoritesFailure()
          )
        })
      )
    })
  )
}, { functional: true})
