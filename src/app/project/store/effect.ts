import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {ProjectService} from "../../shared/services/project.service";
import {projectActions} from "./actions";
import {map, switchMap} from "rxjs";
import {ProjectInterface} from "../../home/projects/types/project.interface";

export const getProjectEffect = createEffect(
  (
    actions$ = inject(Actions),
      projectService = inject(ProjectService)
  ) => {
    return actions$.pipe(
      ofType(projectActions.getProject),
      switchMap(({slug}) => {
        return projectService.getProject(slug).pipe(
          map((project: ProjectInterface) => {
            return projectActions.getProjectSuccess({project})
          })
        )
      })
    )
  },
  {functional: true}
)
