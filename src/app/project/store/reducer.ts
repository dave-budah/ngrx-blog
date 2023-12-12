import {ProjectStateInterface} from "../types/projectstate.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {projectActions} from "./actions";
import {routerNavigationAction} from "@ngrx/router-store";

const initialState: ProjectStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const projectFeature = createFeature({
  name: 'project',
  reducer: createReducer(
    initialState,
    on(projectActions.getProject, (state) => ({...state, isLoading: true})),
    on(projectActions.getProjectSuccess, (state, action) => ({...state, isLoading: false, data: action.project})),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: projectFeatureKey,
  reducer: projectReducer,
  selectIsLoading,
  selectError,
  selectData: selectProjectData
} = projectFeature
