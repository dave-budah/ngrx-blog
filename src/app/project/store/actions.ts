import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ProjectInterface} from "../../home/projects/types/project.interface";

export const projectActions = createActionGroup({
  source: 'project',
  events: {
    'Get project': props<{slug: string}>(),
    'Get project success': props<{project: ProjectInterface}>(),
    'Get project failure': emptyProps(),

    'Delete project': props<{slug: string}>(),
    'Delete project success': emptyProps(),
    'Delete project failure': emptyProps(),
  }
})
