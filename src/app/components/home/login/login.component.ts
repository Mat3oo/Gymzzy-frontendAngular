import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'

import { IServerErrorMessage } from 'src/app/models/ServerResponses/IServerErrorMessage'
import { ITokens } from 'src/app/models/ServerResponses/ITokens'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../form-styles.css'
  ],
  providers: [
    LoginService
  ]
})
export class LoginComponent implements OnInit {
  constructor (
    private _loginService: LoginService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit (): void {
  }

  onSubmit (form: NgForm): void {
    this._loginService.loginUser({ email: form.value.Email, password: form.value.Password })
      .subscribe(
        (respone: ITokens) => {
          localStorage.setItem('accessToken', respone.accessToken)
          this._router.navigate(['/user/addTraining'])
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              this._toastrService.error((err.error as IServerErrorMessage).userMessage, 'Authentication failed')
              break
            default:
              this._toastrService.error('Something goes wrong. Try again later.')
          }
        }
      )
  }
}
