import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'

import { ToastrService } from 'ngx-toastr'

import { TrainingsService } from 'src/app/services/trainings.service'
import { OneRepMaxService } from 'src/app/services/one-rep-max.service'
import { ISeries } from 'src/app/models/ITraining'

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: [
    './add-training.component.css',
    './../trainingForm.css'
  ]
})
export class AddTrainingComponent implements OnInit {
  public AddTrainingInProgress: boolean = false

  trainingForm = this._formBuilder.group({
    Exercises: this._formBuilder.array([])
  })

  oneRM: (series: ISeries[]) => number | null = this._oneRepMaxService.oneRepMaxFormula()

  constructor (private _formBuilder: FormBuilder,
    private _trainingsService: TrainingsService,
    private _toastrService: ToastrService,
    private _oneRepMaxService: OneRepMaxService) { }

  ngOnInit (): void {
  }

  onSubmit () {
    this.AddTrainingInProgress = true

    this._trainingsService.addTrainig(this.trainingForm.value)
      .subscribe(
        success => {
          this._toastrService.success('The training session has been saved.', 'Training saved')
          this.Exercises.clear()
        }
      )
      .add(
        () => { this.AddTrainingInProgress = false }
      )
  }

  addExercise () {
    this.Exercises.push(this._formBuilder.group({
      Name: ['', Validators.required],
      Series: this._formBuilder.array([])
    }))

    this.addSeries(this.Exercises.length - 1)
  }

  removeExercise (exerciseIndex: number) {
    this.Exercises.removeAt(exerciseIndex)
  }

  addSeries (exerciseIndex: number) {
    this.getExerciseSeries(exerciseIndex).push(
      this._formBuilder.group({
        Weight: ['', Validators.required],
        Reps: ['', Validators.required]
      }))
  }

  removeSeries (exerciseIndex: number, seriesIndex: number) {
    this.getExerciseSeries(exerciseIndex).removeAt(seriesIndex)

    if (this.getExerciseSeries(exerciseIndex).length < 1) {
      this.removeExercise(exerciseIndex)
    }
  }

  public get Exercises (): FormArray { return this.trainingForm.get('Exercises') as FormArray }

  public getExerciseSeries (exerciseIndex: number): FormArray { return this.Exercises.at(exerciseIndex).get('Series') as FormArray }
}
