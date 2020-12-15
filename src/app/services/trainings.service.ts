import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { GlobalConstans } from '../common/global-constans'
import { ITrainingSimpleView } from '../models/ServerResponses/ITrainingSimpleView'

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  private _apiUrl = GlobalConstans.apiUrlSSL + '/trainings'

  constructor (private _httpClient: HttpClient) { }

  public getAll (): Observable<ITrainingSimpleView[]> {
    const token = localStorage.getItem('accessToken')
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token })

    return this._httpClient.get<ITrainingSimpleView[]>(this._apiUrl, { headers: headers })
  }

  public deleteTraining (id: string): Observable<any> {
    const token = localStorage.getItem('accessToken')
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token })

    return this._httpClient.delete(this._apiUrl + `/${id}`, { headers: headers })
  }
}
