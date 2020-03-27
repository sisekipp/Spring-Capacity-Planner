import {TeamMember} from './model/teammember.model';
import {ScrumTeam} from './model/scrumteam.model';

export interface SprintCapacityPlanerStateModel {
  from: string;
  to: string;
  workingHours: number;
  capacity: number;
  teamMember: TeamMember[];
  sprintLength: number;
  workWeek: number;
  capacityForTask: number;
  scrumTeams: ScrumTeam[];
}
