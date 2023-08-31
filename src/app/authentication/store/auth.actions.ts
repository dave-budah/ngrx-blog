import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {SignupRequestInterface} from "../signuprequest.interface";
import {CurrentUserInterface} from "../../shared/types/currentuser.interface";
import {BackendErrorsInterface} from "../../shared/types/backenderrors.interface";
import {LoginRequestInterface} from "../loginrequest.interface";
import {CurrentUserRequestInterface} from "../../shared/types/currentuserrequest.interface";


export const authActions = createActionGroup({
  source: 'signup',
  events: {
    Signup: props<{ request: SignupRequestInterface}>(),
    'Signup Success': props<{ currentUser: CurrentUserInterface}>(),
    'Signup Failure': props<{ errors: BackendErrorsInterface}>(),

    // Login
    Login: props<{ request: LoginRequestInterface}>(),
    'Login Success': props<{ currentUser: CurrentUserInterface}>(),
    'Login Failure': props<{ errors: BackendErrorsInterface}>(),

    // Get current user
    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUserInterface}>(),
    'Get current user failure':  emptyProps(),

    // Update current user
    'Update current user': props<{currentUserRequest: CurrentUserRequestInterface}>(),
    'Update current user success': props<{ currentUser: CurrentUserInterface}>(),
    'Update current user failure':  props<{ errors: BackendErrorsInterface}>(),

    // Logout
    Logout: emptyProps()
  },
})
