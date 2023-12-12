import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ProjectInterface} from "../../home/projects/types/project.interface";

export const projectActions = createActionGroup({
  source: 'project',
  events: {
    'Get project': props<{slug: string}>(),
    'Get project success': props<{project: ProjectInterface}>(),
    'Get project failure': emptyProps(),
  }
})
