import { Injectable } from '@angular/core'
import { ISeries } from '../models/ITraining'

@Injectable({
  providedIn: 'root'
})
export class OneRepMaxService {
  constructor () { }

  public oneRepMaxFormula: (series: ISeries[]) => number | null = this.BrzyckiFormula

  private BrzyckiFormula (series: ISeries[]): number | null {
    const temp = series.sort((a, b) => { return b.Weight - a.Weight })

    if ((temp[0].Weight > 0) && (temp[0].Reps > 0)) {
      return (temp[0].Weight * (36 / (37 - temp[0].Reps)))
    } else {
      return null
    }
  }
}
