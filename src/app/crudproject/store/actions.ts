import {createActionGroup, props} from "@ngrx/store";
import {ProjectInterface} from "../../home/projects/types/project.interface";
import {ProjectRequestInterface} from "../../shared/types/projectrequest";
import {BackendErrorsInterface} from "../../shared/types/backenderrors.interface";

export const createProjectActions = createActionGroup({
  source: 'create project',
  events: {
    'Create project': props<{request: ProjectRequestInterface}>(),
    'Create project success': props<{project: ProjectInterface}>(),
    'Create project failure': props<{errors: BackendErrorsInterface}>(),

  }
})
