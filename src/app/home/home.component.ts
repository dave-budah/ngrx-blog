import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ContactService} from "../services/contact.service";
import {FeedComponent} from "./projects/feed/feed.component";

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FeedComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent  implements OnInit {

  apiUrl = '/projects'

  FormData!: FormGroup;
  successMessage: string = ''
  errorMessage: string= '';
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  constructor(private _formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private contactService: ContactService) {}
  ngOnInit(): void {
    // Contact Form
    this.FormData = this._formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
    // Animation script for web elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>{
        if(entry.isIntersecting) {
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      })
    })

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el))
  }

  getControl(name: any): AbstractControl | null {
    return this.FormData.get(name)
  }

  onSubmit(FormData: FormData) {
    if (this.FormData.invalid) {
      return;
    }
    this.contactService.PostMessage(FormData)
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm'
        console.log(response)
        console.log(FormData)
      }, error => {
        console.warn(error.responseText)
        console.log({ error })
      })
    this.FormData.reset();
  }
}
