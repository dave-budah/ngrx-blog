import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent  implements OnInit {

  contactForm!: UntypedFormGroup;
  successMessage: string = ''
  errorMessage: string= '';
  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient) {}
  ngOnInit(): void {
    // Contact Form
    this.contactForm = this._formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
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

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    const { name, subject, email, message } = this.contactForm.value;
    const body = `Name: ${name}\nSubject: ${subject}\nEmail: ${email}\nMessage: ${message}`;
    // Send the email using the Angular HttpClient
    this.httpClient.post('info@selvigtech.com', body).subscribe(() => {
      // Show a success message to the user
      this.successMessage = 'Your message has been sent.';
      console.log(this.successMessage);
      console.log(this.contactForm)
    }, (error) => {
      // Show an error message to the user
      this.errorMessage = 'There was an error sending your message.';
      console.log(this.errorMessage);
    });
  }
}
