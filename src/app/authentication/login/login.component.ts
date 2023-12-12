import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ErrormsgComponent} from "../../shared/components/errormsg/errormsg.component";
import {combineLatest} from "rxjs";
import {selectIsSubmitting, selectValidationErrors} from "../store/auth.reducers";
import {Store} from "@ngrx/store";
import {authActions} from "../store/auth.actions";
import {LoginRequestInterface} from "../loginrequest.interface";

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ErrormsgComponent],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup;
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  showPassword: boolean = false;

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  constructor(private _formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private store: Store
              ) {
  }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['',[ Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  getControl(name: any): AbstractControl | null {
    return this.signInForm.get(name)
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    const request: LoginRequestInterface = {
      user: this.signInForm.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}))
  }
}
