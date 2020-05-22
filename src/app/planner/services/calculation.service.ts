import * as Comlink from 'comlink';
import { TeamMember } from '../../model/teammember.model';
import { Injectable } from '@angular/core';

const CalcWorker = Comlink.wrap(
  new Worker('../workers/calc.worker', { type: 'module' })
);

@Injectable({providedIn: 'root'})
export class CalculationService {
  constructor() {
  }

  // tslint:disable-next-line:max-line-length
   async calcCapacity(teammembers: TeamMember[], workingsHours: number, workWeek: number, capacityForTasks: number, from: string, to: string): Promise<number> {
     // @ts-ignore
     const worker = await new CalcWorker();
     const newCapacity = await worker.calcCapacity(teammembers, workingsHours, workWeek, capacityForTasks, from, to);

     return newCapacity;
   }
}
