import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'

import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor (
    private _router: Router,
    private _authService: AuthService
  ) { }

  public canActivate (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canUserActivate()
  }

  public canActivateChild (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canUserActivate()
  }

  private canUserActivate (): boolean {
    if (!this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/home/login')
      return false
    } else {
      return true
    }
  }
}
