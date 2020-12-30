import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuardService implements CanActivate {
  constructor (
    private _router: Router,
    private _authService: AuthService
  ) { }

  public canActivate (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/user/profile')
      return false
    } else {
      return true
    }
  }
}
