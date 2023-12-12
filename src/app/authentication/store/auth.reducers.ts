import {createFeature, createReducer, on} from "@ngrx/store";
import {AuthStateInterface} from "../types/authstate.interface";
import {authActions} from "./auth.actions";
import {routerNavigationAction} from "@ngrx/router-store";



const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null
}

const authFeature = createFeature({
 name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.signup,
      (state) =>
        ({...state, isSubmitting: true,  validationErrors: null,})),
    on(authActions.signupSuccess,
      (state, action) =>
        ({...state, isSubmitting: false,  currentUser: action.currentUser})),
    on(authActions.signupFailure,
      (state, action) =>
        ({...state, isSubmitting: false, validationErrors: action.errors})),

    // login
      on(authActions.login,
    (state) =>
    ({...state, isSubmitting: true,  validationErrors: null,})),
    on(authActions.loginSuccess,
      (state, action) =>
        ({...state, isSubmitting: false,  currentUser: action.currentUser})),
      on(authActions.loginFailure,
        (state, action) =>
          ({...state, isSubmitting: false, validationErrors: action.errors})),

    // current user
    on(authActions.getCurrentUser,
      (state) =>
        ({...state, isLoading: true, })),
    on(authActions.getCurrentUserSuccess,
      (state, action) =>
        ({...state, isLoading: false,  currentUser: action.currentUser})),
    on(authActions.getCurrentUserFailure,
      (state,) =>
        ({...state, isLoading: false, currentUser: null })),
// Update current user
    on(authActions.updateCurrentUserSuccess,
      (state, action) =>
        ({...state,  currentUser: action.currentUser})),

      on(routerNavigationAction, (state) =>({...state, validationErrors: null})),
      on(authActions.logout, (state) => ({...state, ...initialState, currentUser: null}))
      ),

    })

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors
} = authFeature
