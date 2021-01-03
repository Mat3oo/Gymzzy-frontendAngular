import { Injectable } from '@angular/core'
import { ISeries } from '../models/ITraining'

@Injectable({
  providedIn: 'root'
})
export class OneRepMaxService {
  public oneRepMaxFormula (): (series: ISeries[]) => number | null {
    return (series: ISeries[]): number | null => { return this.formula(series) }
  }

  private formula (series: ISeries[]): number | null {
    const maxSeries = this.filterMaxSeries(series)
    return this.brzyckiFormula(maxSeries)
  }

  private brzyckiFormula (series: ISeries): number | null {
    if ((series.Weight > 0) && (series.Reps > 0)) {
      return (series.Weight * (36 / (37 - series.Reps)))
    } else {
      return null
    }
  }

  private filterMaxSeries (series: ISeries[]): ISeries {
    const sortedByReps = series.sort((a, b) => { return b.Reps - a.Reps })
    const sortedByRepsAndWeight = sortedByReps.sort((a, b) => { return b.Weight - a.Weight })
    return sortedByRepsAndWeight[0]
  }
}
