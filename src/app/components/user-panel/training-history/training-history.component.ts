import { Component, OnInit } from '@angular/core'

import { ITrainingSimpleView } from 'src/app/models/ServerResponses/ITrainingSimpleView'
import { TrainingsService } from 'src/app/services/trainings.service'

@Component({
  selector: 'app-training-history',
  templateUrl: './training-history.component.html',
  styleUrls: ['./training-history.component.css']
})
export class TrainingHistoryComponent implements OnInit {
  trainings: ITrainingSimpleView[] = []

  constructor (private _trainingService: TrainingsService) { }

  ngOnInit (): void {
    this._trainingService.getAll().subscribe(
      respond => {
        this.trainings = respond
      }
    )
  }
}
