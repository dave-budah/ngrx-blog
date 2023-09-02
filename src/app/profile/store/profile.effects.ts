import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap} from "rxjs";
import {ProfileService} from "../profile.service";
import {ProfileInterface} from "../types/profile.interface";
import {profileActions} from "./profile.actions";

export const getProfileEffect = createEffect((
  actions$ = inject(Actions),
  profileService  = inject(ProfileService)) => {
  return actions$.pipe(
    ofType(profileActions.getProfile),
    switchMap(({ slug }) => {
      return profileService.getProfile(slug).pipe(
        map((profile: ProfileInterface) => {
          return profileActions.getProfileSuccess({profile})
        }),
        catchError(() => {
          return of(
            profileActions.getProfileFailure()
          )
        })
      )
    })
  )
}, { functional: true})
