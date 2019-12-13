import {TeamMember} from './teammember.model';

export interface SprintCapacityPlanerStateModel {
  from: string;
  to: string;
  workingHours: number;
  capacity: number;
  teamMember: TeamMember[];
  sprintLength: number;
  workWeek: number;
  capacityForTask: number;
}
