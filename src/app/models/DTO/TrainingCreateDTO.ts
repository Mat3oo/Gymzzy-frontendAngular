export class TrainingCreateSetDTO {
  Reps: number
  Weight: number

  constructor (reps: number, weight: number) {
    this.Reps = reps
    this.Weight = weight
  }
}

export class TrainingCreateExerciseDTO {
  Name: string
  Sets: TrainingCreateSetDTO[]

  constructor (name: string) {
    this.Name = name
    this.Sets = []
  }
}

export class TrainingCreateDTO {
  Date: string
  Exercises: TrainingCreateExerciseDTO[]

  constructor (date: string) {
    this.Date = date
    this.Exercises = []
  }
}
