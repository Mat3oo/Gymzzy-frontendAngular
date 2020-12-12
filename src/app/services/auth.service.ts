import { Injectable } from '@angular/core'

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessToken: string = ''
  private _jwtHelper: JwtHelperService = new JwtHelperService()

  constructor () { }

  public isLoggedIn (): boolean {
    this.readToken()

    if (this._accessToken === '') {
      return false
    } else {
      return true
    }
  }

  private readToken (): void {
    const readToken = localStorage.getItem('accessToken')

    if (readToken !== null) {
      this._accessToken = readToken

      if (this._jwtHelper.isTokenExpired(this._accessToken)) {
        localStorage.removeItem('accessToken')
        this._accessToken = ''
      }
    } else {
      this._accessToken = ''
    }
  }
}
