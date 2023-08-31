import {catchError, map, of, switchMap, tap} from "rxjs";
import {Actions, ofType, createEffect} from "@ngrx/effects";
import {inject} from "@angular/core";
import {updatearticleActions} from "./updatearticle.actions";
import {UpdatearticleService} from "../updatearticle.service";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ArticleService as SharedArticleService} from "../../../shared/services/article.service";

export const getArticleEffect = createEffect((
  actions$ = inject(Actions),
  articleService  = inject(SharedArticleService)) => {
  return actions$.pipe(
    ofType(updatearticleActions.getArticle),
    switchMap(({ slug }) => {
      return articleService.getArticle(slug).pipe(
        map((article: ArticleInterface) => {
          return updatearticleActions.getArticleSuccess({article})
        }),
        catchError(() => {
          return of(
            updatearticleActions.getArticleFailure()
          )
        })
      )
    })
  )
}, { functional: true})

export const updateArticleEffect = createEffect((
  actions$ = inject(Actions),
  updateArticleService  = inject(UpdatearticleService)) => {
  return actions$.pipe(
    ofType(updatearticleActions.updateArticle),
    switchMap(({ request, slug }) => {
      return updateArticleService.updateArticle(slug, request).pipe(
        map((article: ArticleInterface) => {
          return updatearticleActions.updateArticleSuccess({article})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updatearticleActions.updateArticleFailure({errors: errorResponse.error.errors})
          )
        })
      )
    })
  )
}, { functional: true})

export const redirectAfterUpdateEffect = createEffect (
(actions$ = inject(Actions), router = inject(Router)) => {
  return actions$.pipe(
    ofType(updatearticleActions.updateArticleSuccess),
    tap(({article}) => {
      router.navigate(['/articles', article.slug])
    })
  )
}, { functional: true, dispatch: false}
)
