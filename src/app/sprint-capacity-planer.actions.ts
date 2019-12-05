import {TeamMember} from './teammember.model';

export class NewWorkingHours {
  static readonly type = '[Sprint Capacity] New Working Hours';

  constructor(public workingHours: number) {
  }
}

export class NewTeamMember {
  static readonly type = '[Sprint Capacity] New Team Member';

  constructor(public name: string, public daysOf: number) {
  }
}

export class NewDate {
  static readonly type = 'New Date';
  constructor(public from: string, public to: string) {
  }
}

export class DeleteTeamMember {
  static readonly type = 'Delete Team Member';
  constructor(public teamMember: TeamMember) {
  }
}

export class EditTeamMember {
  static readonly type = 'Edit Team Member';
  constructor(public name: string, public daysOf: number) {
  }
}

export class CalcCapacity {
  static readonly type = 'Calc Capacity';
}

