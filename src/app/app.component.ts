import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamMember} from './teammember.model';
import {Select, Store} from '@ngxs/store';
import {SprintCapacityPlanerState} from './sprint-capacity-planer.state';
import {DeleteTeamMember, EditTeamMember, NewDate, NewTeamMember, NewWorkingHours} from './sprint-capacity-planer.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select(SprintCapacityPlanerState.teammembers) teamMembers$: Observable<TeamMember[]>;
  @Select(SprintCapacityPlanerState.to) from$: Observable<string>;
  @Select(SprintCapacityPlanerState.to) to$: Observable<string>;
  @Select(SprintCapacityPlanerState.workingHours) workingHours$: Observable<number>;
  @Select(SprintCapacityPlanerState.capacity) capacity$: Observable<number>;
  @Select(SprintCapacityPlanerState.sprintLength) sprintLength$: Observable<number>;
  @Select(SprintCapacityPlanerState.workWeek) workWeek$: Observable<number>;

  fromDate: string = moment().format('DD.MM.YYYY');
  toDate: string = moment().format('DD.MM.YYYY');

  newModalOpen: boolean;
  editModalOpen: boolean;
  teamMemberToEdit: TeamMember;


  constructor(private readonly store: Store) {
    console.log(moment().format('DD.MM.YYYY'));
  }

  onWorkingHoursChange(hours: string): void {
    this.store.dispatch(new NewWorkingHours(parseInt(hours, 0)));
  }

  onFromChange(from: string): void {

  }

  onDateChange(from: string, to: string): void {
    this.store.dispatch(new NewDate(from, to));
  }

  onAddTeamMember(name: string, daysOf: string) {
    this.store.dispatch(new NewTeamMember(name, parseInt(daysOf, 0)));
    this.newModalOpen = false;
  }

  onWorkWeekChange(workWeek: string): void {

  }

  onDeleteTeamMember(teammember: TeamMember) {
    this.store.dispatch(new DeleteTeamMember(teammember));
  }

  onEditTeamMember(name: string, daysOf: string) {
    this.store.dispatch(new EditTeamMember(name, parseInt(daysOf, 0)));
    this.editModalOpen = false;
  }

  openEditTeamMemberModal(teammember: TeamMember) {
    this.teamMemberToEdit = teammember;
    this.editModalOpen = true;
  }
}
