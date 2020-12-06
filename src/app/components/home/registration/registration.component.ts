import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    './registration.component.css',
    '../form-styles.css'
  ]
})
export class RegistrationComponent implements OnInit {
  registerForm = this.formBuilder.group({
    Nick: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    })
  });

  constructor (private formBuilder: FormBuilder) { }

  ngOnInit (): void {
  }

  onSubmit () {
  }
}
