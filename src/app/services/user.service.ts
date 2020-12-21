import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { GlobalConstans } from '../common/global-constans'
import { IUserDetailsViewDTO } from '../models/DTO/ServerResponses/IUserDetailsViewDTO'
import { RespondErrorCodes } from '../common/RespondErrorCodes'
import { IUserDetailsEditDTO } from '../models/DTO/IUserDetailsEditDTO'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _apiUrl = GlobalConstans.apiUrlSSL + '/user'
  private readonly _header = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('accessToken') })

  constructor (private _httpClient: HttpClient) { }

  public getUserDetails (): Observable<IUserDetailsViewDTO> {
    return this._httpClient.get<IUserDetailsViewDTO>(this._apiUrl, { headers: this._header })
  }

  public updateUserDetails (userDetails: IUserDetailsEditDTO): Observable<any> {
    return this._httpClient.put(this._apiUrl, userDetails, { headers: this._header })
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
