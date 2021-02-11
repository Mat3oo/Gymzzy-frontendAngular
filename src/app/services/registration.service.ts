import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { iif, Observable, of, throwError } from 'rxjs'
import { catchError, concatMap, delay, retryWhen } from 'rxjs/operators'

import { GlobalConstans } from '../common/global-constans'
import { RespondErrorCodes } from '../common/RespondErrorCodes'
import { IUserRegistDTO } from '../models/DTO/IUserRegistDTO'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly _apiUrl: string = GlobalConstans.apiUrlSSL;
  private readonly _retryCount: number = GlobalConstans.retryCount;
  private readonly _retryDelayMs: number = GlobalConstans.retryDelayMs;

  constructor (private readonly _httpClient: HttpClient) { }

  public registUser (registModel: IUserRegistDTO): Observable<any> {
    return this._httpClient
      .post(`${this._apiUrl}/user/regist`, registModel)
      .pipe(
        retryWhen(
          (errors) =>
            errors.pipe(
              concatMap(
                (value: HttpErrorResponse, index: number) =>
                  iif(
                    () => (index > this._retryCount) || ((value.status < 500) || (value.status > 599)),
                    throwError(value),
                    of(value).pipe(delay(this._retryDelayMs)))
              )
            )
        ),
        catchError(this.handleError)
      )
  }

  private handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error of type ErrorEvent occurred: ', error.error.message)
      return throwError(error)
    } else {
      // The backend returned an unsuccessful response code.
      const errorCodes: RespondErrorCodes[] = []
      switch (error.status) {
        case 422:
          error.error.forEach((element: {code: string}) => {
            switch (element.code) {
              case RespondErrorCodes.DuplicatedEmail:
                errorCodes.push(RespondErrorCodes.DuplicatedEmail)
                break
              case RespondErrorCodes.DuplicatedNick:
                errorCodes.push(RespondErrorCodes.DuplicatedNick)
                break
              case RespondErrorCodes.InvalidUserName:
                errorCodes.push(RespondErrorCodes.InvalidUserName)
                break
            }
          })
          return throwError(errorCodes)
        default:
          console.error(`Error mesage: ${error.message}`)
          return throwError(error)
      }
    }
  }
}
