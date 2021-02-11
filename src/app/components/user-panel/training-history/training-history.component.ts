import { Component, OnInit } from '@angular/core'

import { ITrainingSimpleViewDTO } from 'src/app/models/DTO/ServerResponses/ITrainingSimpleViewDTO'
import { TrainingsService } from 'src/app/services/trainings.service'

@Component({
  selector: 'app-training-history',
  templateUrl: './training-history.component.html',
  styleUrls: ['./training-history.component.css']
})
export class TrainingHistoryComponent implements OnInit {
  public HistoryInProgress: boolean = false

  trainings: ITrainingSimpleViewDTO[] = []

  constructor (private readonly _trainingService: TrainingsService) { }

  ngOnInit (): void {
    this.HistoryInProgress = true

    this._trainingService.getAllTrainings()
      .subscribe(
        respond => {
          this.trainings = respond
        }
      )
      .add(
        () => {
          this.HistoryInProgress = false
        }
      )
  }

  thrash (id: string): void {
    this._trainingService.deleteTraining(id).subscribe(
      success => {
        this.trainings = this.trainings.filter(element => {
          return element.id !== id
        })
      }
    )
  }
}
