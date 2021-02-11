import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { iif, Observable, of, throwError } from 'rxjs'
import { concatMap, delay, retryWhen } from 'rxjs/operators'

import { GlobalConstans } from '../common/global-constans'
import { ITraining } from '../models/ITraining'
import { TrainingCreateDTO, TrainingCreateSeriesDTO } from '../models/DTO/TrainingCreateDTO'
import { ITrainingSimpleViewDTO } from '../models/DTO/ServerResponses/ITrainingSimpleViewDTO'
import { ITrainingViewDTO } from '../models/DTO/ServerResponses/ITrainingViewDTO'
import { TrainingEditDTO, TrainingEditSeriesDTO } from '../models/DTO/TrainingEditDTO'

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  private readonly _apiUrl: string = `${GlobalConstans.apiUrlSSL}/trainings`
  private readonly _retryCount: number = GlobalConstans.retryCount;
  private readonly _retryDelayMs: number = GlobalConstans.retryDelayMs;

  constructor (private readonly _httpClient: HttpClient) { }

  public getTraining (id: string): Observable<ITrainingViewDTO> {
    return this._httpClient
      .get<ITrainingViewDTO>(`${this._apiUrl}/${id}`, { headers: this.generateAuthorizationHeader() })
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
        )
      )
  }

  public getAllTrainings (): Observable<ITrainingSimpleViewDTO[]> {
    return this._httpClient
      .get<ITrainingSimpleViewDTO[]>(this._apiUrl, { headers: this.generateAuthorizationHeader() })
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
        )
      )
  }

  public addTrainig (trainingModel: ITraining) {
    const training = new TrainingCreateDTO(new Date().toISOString())

    trainingModel.Exercises?.forEach(elementExercise => {
      elementExercise.Series?.forEach(elementSeries => {
        training.Series?.push(new TrainingCreateSeriesDTO(elementSeries.Reps, elementSeries.Weight, elementExercise.Name))
      })
    })

    return this._httpClient
      .post(this._apiUrl, training, { headers: this.generateAuthorizationHeader() })
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
        )
      )
  }

  public updateTraining (trainingModel: ITraining, id: string): Observable<any> {
    const training = new TrainingEditDTO(trainingModel.Date)

    trainingModel.Exercises?.forEach(elementExercise => {
      elementExercise.Series?.forEach(elementSeries => {
        training.Series?.push(new TrainingEditSeriesDTO(elementSeries.Reps, elementSeries.Weight, elementExercise.Name))
      })
    })

    return this._httpClient
      .put(`${this._apiUrl}/${id}`, training, { headers: this.generateAuthorizationHeader() })
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
        )
      )
  }

  public deleteTraining (id: string): Observable<any> {
    return this._httpClient
      .delete(`${this._apiUrl}/${id}`, { headers: this.generateAuthorizationHeader() })
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
        )
      )
  }

  private generateAuthorizationHeader (): HttpHeaders {
    const token = localStorage.getItem('accessToken')
    return new HttpHeaders({ Authorization: 'Bearer ' + token })
  }
}
