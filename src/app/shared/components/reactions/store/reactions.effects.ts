import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {FeedService} from "../../../../services/feed.service";
import {feedActions} from "../../feed/store/feed.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {GetFeedResponseInterface} from "../../feed/types/getfeedresponse.interface";
import {AddtofavoriteService} from "../services/addtofavorite.service";
import {addToFavoritesActions} from "./reactions.actions";
import {ArticleInterface} from "../../../types/article.interface";

export const addToFavoritesEffect = createEffect((
  actions$ = inject(Actions),
  addtofavoriteService  = inject(AddtofavoriteService)) => {
  return actions$.pipe(
    ofType(addToFavoritesActions.addToFavorites),
    switchMap(({ isFavorited, slug }) => {
      const articles$ = isFavorited ? addtofavoriteService.removeFromFavorites(slug) : addtofavoriteService.addToFavorites(slug)
      return articles$.pipe(
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
