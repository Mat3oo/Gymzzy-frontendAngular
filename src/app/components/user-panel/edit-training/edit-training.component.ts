import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { ToastrService } from 'ngx-toastr'

import { ITrainingViewDTO } from 'src/app/models/DTO/ServerResponses/ITrainingViewDTO'
import { IExercise, ISeries, ITraining } from 'src/app/models/ITraining'

import { TrainingsService } from 'src/app/services/trainings.service'
import { OneRepMaxService } from 'src/app/services/one-rep-max.service'

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: [
    './edit-training.component.css',
    './../trainingForm.css'
  ]
})
export class EditTrainingComponent implements OnInit {
  private _id: string

  public EditTrainingInProgress: boolean = false
  public GetTrainingInProgress: boolean = false

  trainingForm = this._formBuilder.group({
    Date: ['', Validators.required],
    Exercises: this._formBuilder.array([])
  })

  oneRM: (series: ISeries[]) => number | null = this._oneRepMaxService.oneRepMaxFormula()

  constructor (private readonly _route: ActivatedRoute,
    private readonly _trainingsService: TrainingsService,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastrService: ToastrService,
    private readonly _oneRepMaxService: OneRepMaxService) {
    this._id = this._route.snapshot.paramMap.get('id') ? this._route.snapshot.paramMap.get('id')! : ''
  }

  ngOnInit (): void {
    this.GetTrainingInProgress = true

    this._trainingsService.getTraining(this._id)
      .subscribe(
        success => {
          const mappedIntoModel = this.mapTrainingViewDTO(success)
          this.initializeForm(mappedIntoModel)
        }
      )
      .add(
        () => { this.GetTrainingInProgress = false }
      )
  }

  onSubmit (): void {
    this.EditTrainingInProgress = true

    this._trainingsService.updateTraining(this.trainingForm.value, this._id)
      .subscribe(
        success => {
          this._toastrService.success('Training updated.', 'Training update')
        }
      )
      .add(
        () => { this.EditTrainingInProgress = false }
      )
  }

  addExercise (): void {
    this.Exercises.push(this._formBuilder.group({
      Name: ['', Validators.required],
      Series: this._formBuilder.array([])
    }))

    this.addSeries(this.Exercises.length - 1)
  }

  removeExercise (exerciseIndex: number): void {
    this.Exercises.removeAt(exerciseIndex)
  }

  addSeries (exerciseIndex: number): void {
    this.getExerciseSeries(exerciseIndex).push(
      this._formBuilder.group({
        Weight: ['', Validators.required],
        Reps: ['', Validators.required]
      }))
  }

  removeSeries (exerciseIndex: number, seriesIndex: number): void {
    this.getExerciseSeries(exerciseIndex).removeAt(seriesIndex)

    if (this.getExerciseSeries(exerciseIndex).length < 1) {
      this.removeExercise(exerciseIndex)
    }
  }

  public get Exercises (): FormArray { return this.trainingForm.get('Exercises') as FormArray }
  public get TrainingDate (): AbstractControl | null { return this.trainingForm.get('Date') }

  public getExerciseSeries (exerciseIndex: number): FormArray { return this.Exercises.at(exerciseIndex).get('Series') as FormArray }

  private initializeForm (model: ITraining): void {
    this.TrainingDate?.setValue(model.Date)

    model.Exercises?.forEach((value) => {
      this.initializeFormExercise(value)
    })
  }

  private initializeFormExercise (exercise: IExercise): void {
    this.Exercises.push(this._formBuilder.group({
      Name: [exercise.Name, Validators.required],
      Series: this.initializeFormExerciseSeries(exercise.Series!)
    }))
  }

  private initializeFormExerciseSeries (series: ISeries[]): FormArray {
    const seriesFormArray = this._formBuilder.array([])

    series.forEach(value => {
      seriesFormArray.push(this._formBuilder.group({
        Weight: [value.Weight, Validators.required],
        Reps: [value.Reps, Validators.required],
        Record: [value.Record]
      }))
    })

    return seriesFormArray
  }

  private mapTrainingViewDTO (trainingViewDTO: ITrainingViewDTO): ITraining {
    const trainingModel: ITraining = { Date: trainingViewDTO.date, Exercises: [] }

    trainingViewDTO.series.forEach(element => {
      if (!trainingModel.Exercises?.some(value => {
        return value.Name === element.exercise.name
      })) {
        trainingModel.Exercises?.push({ Name: element.exercise.name, Series: [] })
      }

      trainingModel.Exercises?.find(value => {
        return value.Name === element.exercise.name
      })?.Series?.push({ Reps: element.reps, Weight: element.weight, Record: element.record })
    })

    return trainingModel
  }
}
