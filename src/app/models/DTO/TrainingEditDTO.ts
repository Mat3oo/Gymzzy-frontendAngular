export class TrainingEditSetDTO {
  Id?: string
  Reps: number
  Weight: number

  constructor (reps: number, weight: number) {
    this.Reps = reps
    this.Weight = weight
  }
}

export class TrainingEditExerciseDTO {
  Id?: string
  Name: string
  Sets: TrainingEditSetDTO[]

  constructor (name: string) {
    this.Name = name
    this.Sets = []
  }
}

export class TrainingEditDTO {
  Date: string
  Exercises: TrainingEditExerciseDTO[]

  constructor (date: string) {
    this.Date = date
    this.Exercises = []
  }
}
