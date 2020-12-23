export class TrainingEditExerciseDTO {
    Name: string

    constructor (name: string) {
      this.Name = name
    }
}

export class TrainingEditSeriesDTO {
    Id?: string
    Reps: number
    Weight: number
    Exercise: TrainingEditExerciseDTO

    constructor (reps: number, weight: number, exerciseName: string) {
      this.Reps = reps
      this.Weight = weight
      this.Exercise = new TrainingEditExerciseDTO(exerciseName)
    }
}

export class TrainingEditDTO {
    Date: string
    Series: TrainingEditSeriesDTO[]

    constructor (date: string) {
      this.Date = date
      this.Series = []
    }
}
