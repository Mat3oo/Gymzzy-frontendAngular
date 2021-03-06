export interface ITrainingViewSetDTO {
    id: string
    reps: number
    weight: number
    record: boolean
}

export interface ITrainingViewExerciseDTO {
    id: string
    name: string
    sets?: ITrainingViewSetDTO[]
}

export interface ITrainingViewDTO {
    id: string
    date: string
    exercises: ITrainingViewExerciseDTO[]
}
