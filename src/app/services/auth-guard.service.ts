import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor (
    private _router: Router,
    private _authService: AuthService
  ) { }

  public canActivate (): boolean {
    if (!this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/home/login')
      return false
    } else {
      return true
    }
  }
}
