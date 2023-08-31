import {Route} from "@angular/router";
import {SignupComponent} from "../signup/signup.component";
import {LoginComponent} from "../login/login.component";

export const signupRoutes: Route[] = [
  {
    path: '',
    component: SignupComponent,
    title: 'Signup',
  }
]

export const loginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  }
]
