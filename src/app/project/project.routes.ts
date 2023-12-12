import {Route} from "@angular/router";
import {ProjectService} from "../shared/services/project.service";
import {ProjectComponent} from "./project.component";
import * as projectEffects from "./store/effect"
import {provideState} from "@ngrx/store";
import {projectFeatureKey, projectReducer} from "./store/reducer";
import {provideEffects} from "@ngrx/effects";

export const routes: Route[] = [
  {
    path: '',
    component: ProjectComponent,
    title: 'Selvigtech | Project',
    providers: [
      provideEffects(projectEffects),
      provideState(projectFeatureKey, projectReducer),
      ProjectService
    ]
  }
]
