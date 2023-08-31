import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestInterface} from "../signuprequest.interface";
import {map, Observable} from "rxjs";
import {CurrentUserInterface} from "../../shared/types/currentuser.interface";
import {environment} from "../../../environments/environment";
import {AuthResponseInterface} from "../types/authresponse.interface";
import {LoginRequestInterface} from "../loginrequest.interface";
import {CurrentUserRequestInterface} from "../../shared/types/currentuserrequest.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  // Get current user
  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiurl + '/user'
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser))
  }

  // Signup or Create account for a user
  signup(data: SignupRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiurl + '/users'
    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser))
  }

  // Login an existing User
  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiurl + '/users/login'
    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser))
  }

  // Update Current User
  updateCurrentUser(currentUserRequest: CurrentUserRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiurl + '/user'
    return this.http.put<AuthResponseInterface>(url, currentUserRequest).pipe(map(this.getUser))
  }


}
