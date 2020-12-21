export interface ISeries{
    Reps: number
    Weight: number
}

export interface IExercise{
    Name: string,
    Series?: ISeries[]
}

export interface ITraining{
    Date: string
    Exercises?: IExercise[]
}
