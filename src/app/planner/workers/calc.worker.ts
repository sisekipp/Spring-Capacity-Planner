import { expose } from "comlink";

import { differenceInWeeks, parse } from "date-fns";
import { TeamMember } from "../../model/teammember.model";
import { CalcHelper } from "./calc.helper";

export class CalcWorker {
  // tslint:disable-next-line:max-line-length
  calcCapacity(
    teammembers: TeamMember[],
    workingsHours: number,
    workWeek: number,
    capacityForTasks: number,
    from: string,
    to: string
  ): number {
    const sprintLength = differenceInWeeks(
      parse(to, "dd.MM.yyyy", new Date()),
      parse(from, "dd.MM.yyyy", new Date())
    );
    let newCapacity = 0;
    for (const teammember of teammembers) {
      // tslint:disable-next-line:max-line-length
      const memberCapacity = CalcHelper.calcMemberCapacity(
        CalcHelper.calcWorkHours(workingsHours, capacityForTasks),
        CalcHelper.calcDaysOfWork(
          workWeek,
          teammember.workingTimeInPercent,
          sprintLength,
          teammember.isMoD
        ) - teammember.daysOf
      );
      newCapacity = newCapacity + memberCapacity;
    }

    return newCapacity;
  }
}

expose(CalcWorker);
