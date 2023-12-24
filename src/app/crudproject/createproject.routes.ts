import {Route} from "@angular/router";
import {CreateprojectComponent} from "./createproject.component";
import {CrudProjectService} from "../shared/services/crudproject.service";
import * as createProjectEffects from "./store/effects"
import {provideEffects} from "@ngrx/effects";
import {provideState} from "@ngrx/store";
import {createProjectFeatureKey, createProjectReducer} from "./store/reducer";
export const routes: Route[] = [
  {
    path: '',
    component: CreateprojectComponent,
    title: 'Create project',
    providers: [CrudProjectService,
      provideEffects(createProjectEffects),
      provideState(createProjectFeatureKey, createProjectReducer)
    ]
  }
]
