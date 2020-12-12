import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
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
    private _router: Router
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
              console.log((err.error as IServerErrorMessage).userMessage)
              break
            default:
              console.log('Something goes wrong. Try again later.')
          }
        }
      )
  }
}
