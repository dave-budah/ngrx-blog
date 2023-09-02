import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {selectCurrentUser} from "../authentication/store/auth.reducers";
import {combineLatest, filter, Subscription} from "rxjs";
import {CurrentUserInterface} from "../shared/types/currentuser.interface";
import {selectIsSubmitting, selectValidationErrors} from "./store/settings.reducers";
import {ErrormessageComponent} from "../shared/components/errormessage/errormessage.component";
import {ErrormsgComponent} from "../shared/components/errormsg/errormsg.component";
import {CurrentUserRequestInterface} from "../shared/types/currentuserrequest.interface";
import {authActions} from "../authentication/store/auth.actions";

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule, ErrormessageComponent, ErrormsgComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this._formBuilder.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })
  currentUser?: CurrentUserInterface
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })
  currentUserSubscription?: Subscription
  constructor(private _formBuilder: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
        this.currentUserSubscription = this.store.pipe(
          select(selectCurrentUser),
          filter(Boolean)
        ).subscribe( (currentUser) => {
          this.currentUser = currentUser;
          this.initializeForm()
        })
    }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe()
  }
    initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('No data available')
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      email: this.currentUser.email,
      bio: this.currentUser.bio ?? '',
      password: ''
    })
    }

  submit() {
    if (!this.currentUser) {
      throw new Error('No data available')
    }

    const currentUserRequest : CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue()
      }
    }
    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
  }

  logout() {
    this.store.dispatch(authActions.logout())
  }
}
