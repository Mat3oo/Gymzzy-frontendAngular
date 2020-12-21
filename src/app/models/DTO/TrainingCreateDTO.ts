export class TrainingCreateExerciseDTO {
    Name: string

    constructor (name: string) {
      this.Name = name
    }
}

export class TrainingCreateSeriesDTO {
    Reps: number
    Weight: number
    Exercise: TrainingCreateExerciseDTO

    constructor (reps: number, weight: number, exerciseName: string) {
      this.Reps = reps
      this.Weight = weight
      this.Exercise = new TrainingCreateExerciseDTO(exerciseName)
    }
}

export class TrainingCreateDTO {
    Date: string
    Series?: TrainingCreateSeriesDTO[]

    constructor (date: string) {
      this.Date = date
      this.Series = []
    }
}
