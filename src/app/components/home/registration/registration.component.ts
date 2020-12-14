import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

import { RespondErrorCodes } from 'src/app/common/RespondErrorCodes'
import { RegistrationService } from 'src/app/services/registration.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    './registration.component.css',
    '../form-styles.css'
  ]
})
export class RegistrationComponent implements OnInit {
  registerForm = this._formBuilder.group({
    Nick: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Passwords: this._formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validators: this.comparePasswords })
  });

  constructor (private _formBuilder: FormBuilder,
    private _registService: RegistrationService,
    private _toastr: ToastrService,
    private _router: Router) {
    this._toastr.toastrConfig.easeTime = 0
  }

  ngOnInit (): void {
  }

  private comparePasswords (passwordGroupControl: AbstractControl): { [key: string]: any } | null {
    const passwordControl = passwordGroupControl.get('Password')
    const confirmPasswordControl = passwordGroupControl.get('ConfirmPassword')

    return (confirmPasswordControl?.value !== passwordControl?.value) ? { passwordMismatch: 'Confirm password doesn\'t match' } : null
  }

  onSubmit () {
    this._registService.registUser({
      email: this.Email?.value,
      userName: this.Nick?.value,
      password: this.Password?.value
    }).subscribe(
      () => {
        this.registerForm.reset()
        this._toastr.success('New user created.', 'Registration successful.')
        this._router.navigate(['home', 'login'])
      },
      (err: any) => {
        if (Array.isArray(err)) {
          this._toastr.clear();
          (err as RespondErrorCodes[]).forEach(element => {
            switch (element) {
              case RespondErrorCodes.DuplicatedEmail:
                this._toastr.error(`Email: ${this.Email?.value} is already taken.`, 'Registration failed!')
                break
              case RespondErrorCodes.DuplicatedNick:
                this._toastr.error(`Nick: ${this.Nick?.value} is already taken.`, 'Registration failed!')
                break
              case RespondErrorCodes.InvalidUserName:
                this._toastr.error('Nick is invalid, can only contain letters or digits.', 'Registration failed!')
                break
              default:
                this._toastr.error('Unknown error, check inputs and try again.', 'Registration failed!')
                break
            }
          })
        } else {
          this._toastr.error('Something goes wrong. Try again later.', 'Error')
        }
      })
  }

  get Email (): AbstractControl | null { return this.registerForm.get('Email') }
  get Nick (): AbstractControl | null { return this.registerForm.get('Nick') }
  get Passwords (): AbstractControl | null { return this.registerForm.get('Passwords') }
  get Password (): AbstractControl | null { return this.registerForm.get('Passwords.Password') }
  get ConfirmPassword (): AbstractControl | null { return this.registerForm.get('Passwords.ConfirmPassword') }
}
