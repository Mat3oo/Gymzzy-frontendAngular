import { Injectable } from '@angular/core'

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'

import { GlobalConstans } from '../common/global-constans'
import { IUserLoginDTO } from '../models/DTO/IUserLoginDTO'
import { ITokenDTO } from '../models/DTO/ServerResponses/ITokenDTO'
import { IErrorResposneBodyDTO } from '../models/DTO/ServerResponses/IErrorResposneBodyDTO'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _apiUrl: string = GlobalConstans.apiUrlSSL;

  constructor (private readonly _httpClient: HttpClient) { }

  public loginUser (loginModel: IUserLoginDTO): Observable<ITokenDTO> {
    return this._httpClient
      .post<ITokenDTO>(`${this._apiUrl}/user/login`, loginModel)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  private handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error of type ErrorEvent occurred: ', error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      const serverErrorResponse: IErrorResposneBodyDTO = error.error
      console.error(
        `Backend returned code ${error.status}, ` +
        `developer message was: ${serverErrorResponse.developerMessage}`)
    }

    return throwError(error)
  }
}
