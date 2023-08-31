import { UpdateArticleStateInterface} from "../types/updatearticlestate.interface";
import {updatearticleActions} from "./updatearticle.actions";

import {routerNavigatedAction} from "@ngrx/router-store";
import {createFeature, createReducer, on} from "@ngrx/store";


const initialState: UpdateArticleStateInterface = {
  article: null,
  isSubmitting: false,
  isLoading: false,
  validationErrors: null,
}

const updateArticleFeature = createFeature({
  name: 'updateArticle',
  reducer: createReducer(
    initialState,
    on(updatearticleActions.getArticle, (state) => ({...state, isLoading: true})),
    on(updatearticleActions.getArticleSuccess, (state, action) => ({...state, isLoading: false, article: action.article})),
    on(updatearticleActions.getArticleFailure, (state, action) => ({...state, isLoading: false})),


    on(updatearticleActions.updateArticle, (state) => ({...state, isSubmitting: true})),
    on(updatearticleActions.updateArticleSuccess, (state) => ({...state, isSubmitting: false})),
    on(updatearticleActions.updateArticleFailure, (state, action) => ({...state, isSubmitting: false, validationErrors: action.errors})),
    on(routerNavigatedAction, ()  => initialState),
  )
})

export const {
  name: updateArticleFeatureKey,
  reducer: updateArticleReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectArticle,
  selectValidationErrors,
} = updateArticleFeature
