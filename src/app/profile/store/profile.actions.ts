import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ProfileInterface} from "../types/profile.interface";

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'Get profile': props<{ slug: string }>(),
    'Get profile success': props<{ profile: ProfileInterface }>(),
    'Get profile failure': emptyProps(),

  }
})
