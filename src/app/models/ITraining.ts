export interface ISet{
    Reps: number
    Weight: number
    Record: boolean
}

export interface IExercise{
    Name: string,
    Sets?: ISet[]
}

export interface ITraining{
    Date: string
    Exercises?: IExercise[]
}
