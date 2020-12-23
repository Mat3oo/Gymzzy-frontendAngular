export interface ITrainingViewExerciseDTO {
    id: string
    name: string
}

export interface ITrainingViewSeriesDTO {
    id: string
    reps: number
    weight: number
    exercise: ITrainingViewExerciseDTO
}

export interface ITrainingViewDTO {
    id: string
    date: string
    series: ITrainingViewSeriesDTO[]
}
