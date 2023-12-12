import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {SignupRequestInterface} from "../signuprequest.interface";
import {AuthStateInterface} from "../types/authstate.interface";
import {selectIsSubmitting, selectValidationErrors} from "../store/auth.reducers";
import {authActions} from "../store/auth.actions";
import {combineLatest} from "rxjs";
import {ErrormsgComponent} from "../../shared/components/errormsg/errormsg.component";

@Component({
  selector: 'signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ErrormsgComponent],
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signUpForm!: UntypedFormGroup;
  showPassword: boolean = false;
  currentYear  = new Date().getFullYear();
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })
constructor(private _formBuilder: UntypedFormBuilder,
            private router: Router,
            private store: Store) {

}

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
        username     : ['', [Validators.required]],
        email     : ['', [Validators.required, Validators.maxLength(32), Validators.pattern(this.emailRegex)]],
        password  : ['', [Validators.required, Validators.minLength(8)]],
        role: ['oREVjeQJC4J8TDc1EvxhW0QiVYEBHNac', Validators.required], //This will default to subscriber role in production
        confirmPassword  : ['', Validators.required],
      },
      {
        validators:this.PasswordMatch('password', 'confirmPassword')
      }
    )
  }

  getControl(name: any): AbstractControl | null {
    return this.signUpForm.get(name)
  }
  //   Custom password match validation
  PasswordMatch(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const conformPasswordControl = formGroup.controls[confirmPassword];

      if (conformPasswordControl.errors && !conformPasswordControl.errors['PasswordMatch']){
        return;
      }
      if (passwordControl.value !== conformPasswordControl.value) {
        conformPasswordControl.setErrors({ PasswordMatch : true});
      } else {
        conformPasswordControl.setErrors(null);
      }
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    console.log('form', this.signUpForm.getRawValue())
    const request: SignupRequestInterface = {
      user: this.signUpForm.getRawValue(),
    }
    this.store.dispatch(authActions.signup({request}))
  }
}
