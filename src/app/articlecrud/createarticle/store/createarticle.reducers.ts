import {CreateArticleStateInterface} from "../types/createarticlestate.interface";
import {createArticleActions} from "./createarticle.actions";
import {createFeature, createReducer, on} from "@ngrx/store";
import {routerNavigatedAction} from "@ngrx/router-store";


const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}

const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({...state, isSubmitting: true})),
    on(createArticleActions.createArticleSuccess, (state, action) => ({...state, isSubmitting: false})),
    on(createArticleActions.createArticleFailure, (state, action) => ({...state, isSubmitting: false, validationErrors: action.errors})),
    on(routerNavigatedAction, ()  => initialState)
  )
})

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature
