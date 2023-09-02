import {ProfileStateInterface} from "../types/profilestate.interface";
import {createFeature, createReducer, on} from "@ngrx/store";
import {profileActions} from "./profile.actions";
import {routerNavigatedAction} from "@ngrx/router-store";

const initialState: ProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialState,
    on(profileActions.getProfile, (state) => ({...state, isLoading: true})),
    on(profileActions.getProfileSuccess, (state, action) => ({...state, isLoading: false, data: action.profile})),
    on(profileActions.getProfileFailure, (state) => ({...state, isLoading: false})),
    on(routerNavigatedAction, ()  => initialState)
  )
})

export const {
  name: profileFeatureKey,
  reducer: profileReducer,
  selectIsLoading,
  selectError,
  selectData: selectProfileData,
} = profileFeature
