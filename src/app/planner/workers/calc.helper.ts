export class CalcHelper {
  static calcDaysOfWork(
    workingDays: number,
    workingTimeInPercent: number,
    sprintLength,
    isMOD: boolean
  ): number {
    if (isMOD === false) {
      return ((workingDays * workingTimeInPercent) / 100) * sprintLength;
    } else {
      return ((workingDays * workingTimeInPercent) / 100) * (sprintLength - 1);
    }
  }

  static calcWorkHours(workHours: number, capacityForTasks) {
    return (workHours * capacityForTasks) / 100;
  }

  static calcMemberCapacity(workingHoursPerDay: number, workingDays: number) {
    return workingHoursPerDay * workingDays;
  }
}
