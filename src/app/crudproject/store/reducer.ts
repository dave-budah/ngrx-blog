import {createFeature, createReducer, on} from "@ngrx/store";
import {createProjectActions} from "./actions";
import {routerNavigationAction} from "@ngrx/router-store";
import {CreateProjectStateInterface} from "../types/createProjectState.interface";
import {state} from "@angular/animations";

const initialState: CreateProjectStateInterface = {
  isSubmitting: false,
  validationErrors: null
}

const createProjectFeature = createFeature({
  name: 'createProject',
  reducer: createReducer(
    initialState,
    on(createProjectActions.createProject, (state) => ({...state, isSubmitting: true})),
    on(createProjectActions.createProjectSuccess, (state, action) => ({...state, isSubmitting: false})),
    on(createProjectActions.createProjectFailure, (state, action) => ({...state, isSubmitting: false})),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: createProjectFeatureKey,
  reducer: createProjectReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createProjectFeature
