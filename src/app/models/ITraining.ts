export interface ISeries{
    Reps: number
    Weight: number
    Record: boolean
}

export interface IExercise{
    Name: string,
    Series?: ISeries[]
}

export interface ITraining{
    Date: string
    Exercises?: IExercise[]
}
