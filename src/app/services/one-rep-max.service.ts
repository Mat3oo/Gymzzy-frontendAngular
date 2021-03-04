import { Injectable } from '@angular/core'
import { ISet } from '../models/ITraining'

@Injectable({
  providedIn: 'root'
})
export class OneRepMaxService {
  public oneRepMaxFormula (): (sets: ISet[]) => number | null {
    return (sets: ISet[]): number | null => { return this.formula(sets) }
  }

  private formula (sets: ISet[]): number | null {
    const maxSet = this.filterMaxSet(sets)
    return this.brzyckiFormula(maxSet)
  }

  private brzyckiFormula (set: ISet): number | null {
    if ((set.Weight > 0) && (set.Reps > 0)) {
      return (set.Weight * (36 / (37 - set.Reps)))
    } else {
      return null
    }
  }

  private filterMaxSet (sets: ISet[]): ISet {
    const sortedByReps = sets.sort((a, b) => { return b.Reps - a.Reps })
    const sortedByRepsAndWeight = sortedByReps.sort((a, b) => { return b.Weight - a.Weight })
    return sortedByRepsAndWeight[0]
  }
}
