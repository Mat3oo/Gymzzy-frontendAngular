import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { GlobalConstans } from '../common/global-constans'
import { RespondErrorCodes } from '../common/RespondErrorCodes'
import { IRegistrModel } from '../models/IRegistrModel'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private _apiUrl: string = GlobalConstans.apiUrlSSL;

  constructor (private _httpClient: HttpClient) { }

  public registUser (registModel: IRegistrModel): Observable<any> {
    return this._httpClient.post(this._apiUrl + '/user/regist', registModel)
      .pipe(
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
