import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
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
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  form = this._formBuilder.nonNullable.group({
    image: '',
    username: ['', Validators.required],
    bio: '',
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    // password: ['', [Validators.required, Validators.minLength(8)]],
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
  getControl(name: any): AbstractControl | null {
    return this.form.get(name)
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
