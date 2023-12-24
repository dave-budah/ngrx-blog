import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {ProjectService as SharedProjectService} from "../../shared/services/project.service";
import {projectActions} from "../../project/store/actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {CrudProjectService} from "../../shared/services/crudproject.service";
import {createProjectActions} from "./actions";
import {ProjectInterface} from "../../home/projects/types/project.interface";
import {HttpErrorResponse} from "@angular/common/http";

export const createProjectEffect = createEffect(
  (
    actions$ = inject(Actions),
    createProjectService = inject(CrudProjectService)
  ) => {
    return actions$.pipe(
      ofType(createProjectActions.createProject),
      switchMap(({request}) => {
        return createProjectService.createProject(request).pipe(
          map((project: ProjectInterface) => {
            return createProjectActions.createProjectSuccess({ project})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(createProjectActions.createProjectFailure({
              errors: errorResponse.error.errors
            }))
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createProjectActions.createProjectSuccess),
      tap(({project}) => {
        router.navigate(['/projects', project.slug])
      })
    )
  },
  {functional: true, dispatch: false}
)

