import { Injectable } from '@angular/core'

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { GlobalConstans } from '../common/global-constans'
import { ILoginModel } from '../models/ILoginModel'
import { ITokens } from '../models/ServerResponses/ITokens'
import { IServerErrorMessage } from '../models/ServerResponses/IServerErrorMessage'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _apiUrl: string = GlobalConstans.apiUrlSSL;

  constructor (private _httpClient: HttpClient) { }

  public loginUser (loginModel: ILoginModel): Observable<ITokens> {
    return this._httpClient.post<ITokens>(this._apiUrl + '/user/login', loginModel)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error of type ErrorEvent occurred: ', error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      const serverErrorResponse: IServerErrorMessage = error.error
      console.error(
        `Backend returned code ${error.status}, ` +
        `developer message was: ${serverErrorResponse.developerMessage}`)
    }

    return throwError(error)
  }
}
