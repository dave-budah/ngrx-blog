import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {ProjectService as SharedProjectService} from "../../shared/services/project.service";
import {projectActions} from "./actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {ProjectInterface} from "../../home/projects/types/project.interface";
import {Router} from "@angular/router";

export const getProjectEffect = createEffect(
  (
    actions$ = inject(Actions),
      projectService = inject(SharedProjectService)
  ) => {
    return actions$.pipe(
      ofType(projectActions.getProject),
      switchMap(({slug}) => {
        return projectService.getProject(slug).pipe(
          map((project: ProjectInterface) => {
            return projectActions.getProjectSuccess({project})
          }),
          catchError(() => {
            return of(projectActions.getProjectFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const deleteProjectEffect = createEffect(
  (
    actions$ = inject(Actions),
    projectService = inject(SharedProjectService)
  ) => {
    return actions$.pipe(
      ofType(projectActions.deleteProject),
      switchMap(({slug}) => {
        return projectService.deleteProject(slug).pipe(
          map(() => {
            return projectActions.deleteProjectSuccess()
          }),
          catchError(() => {
            return of(projectActions.deleteProjectFailure())
        })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(projectActions.deleteProjectSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)
