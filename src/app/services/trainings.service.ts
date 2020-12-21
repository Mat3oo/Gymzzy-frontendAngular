import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { GlobalConstans } from '../common/global-constans'
import { ITraining } from '../models/ITraining'
import { TrainingCreateDTO, TrainingCreateSeriesDTO } from '../models/DTO/TrainingCreateDTO'
import { ITrainingSimpleViewDTO } from '../models/DTO/ServerResponses/ITrainingSimpleViewDTO'

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  private _apiUrl = GlobalConstans.apiUrlSSL + '/trainings'

  constructor (private _httpClient: HttpClient) { }

  public getAll (): Observable<ITrainingSimpleViewDTO[]> {
    return this._httpClient.get<ITrainingSimpleViewDTO[]>(this._apiUrl, { headers: this.generateAuthorizationHeader() })
  }

  public addTrainig (trainingModel: ITraining) {
    const training = new TrainingCreateDTO(new Date().toISOString())

    trainingModel.Exercises?.forEach(elementExercise => {
      elementExercise.Series?.forEach(elementSeries => {
        training.Series?.push(new TrainingCreateSeriesDTO(elementSeries.Reps, elementSeries.Weight, elementExercise.Name))
      })
    })

    return this._httpClient.post(this._apiUrl, training, { headers: this.generateAuthorizationHeader() })
  }

  public deleteTraining (id: string): Observable<any> {
    return this._httpClient.delete(this._apiUrl + `/${id}`, { headers: this.generateAuthorizationHeader() })
  }

  private generateAuthorizationHeader (): HttpHeaders {
    const token = localStorage.getItem('accessToken')
    return new HttpHeaders({ Authorization: 'Bearer ' + token })
  }
}
