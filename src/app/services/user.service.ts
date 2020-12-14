import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { GlobalConstans } from '../common/global-constans'
import { IUserDetailsModel } from '../models/IUserDetailsModel'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _apiUrl = GlobalConstans.apiUrlSSL + '/user'
  private readonly _header = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('accessToken') })

  constructor (private _httpClient: HttpClient) { }

  public getUserDetails () {
    return this._httpClient.get<IUserDetailsModel>(this._apiUrl, { headers: this._header })
  }
}
