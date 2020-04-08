import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {SprintCapacityPlanerState} from '../../../sprint-capacity-planer.state';
import {Observable} from 'rxjs';

import {addWeeks, format} from 'date-fns';
import {
  DeleteTeamMember, EditTeamMember,
  NewCapacityForTasks,
  NewDate,
  NewTeamMember,
  NewWorkingHours,
  NewWorkingWeek
} from '../../../sprint-capacity-planer.actions';
import {TeamMember} from '../../../model/teammember.model';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {

  @ViewChild('newName') newNameInput: ElementRef;
  @ViewChild('newDaysOf') newDaysOfInput: ElementRef;
  @ViewChild('newWorkingTime') workingTimeInput: ElementRef;

  @Select(SprintCapacityPlanerState.teammembers) teamMembers$: Observable<TeamMember[]>;
  @Select(SprintCapacityPlanerState.to) from$: Observable<string>;
  @Select(SprintCapacityPlanerState.to) to$: Observable<string>;
  @Select(SprintCapacityPlanerState.workingHours) workingHours$: Observable<number>;
  @Select(SprintCapacityPlanerState.capacityInPercentage) capacity$: Observable<number>;
  @Select(SprintCapacityPlanerState.sprintLength) sprintLength$: Observable<number>;
  @Select(SprintCapacityPlanerState.workWeek) workWeek$: Observable<number>;
  @Select(SprintCapacityPlanerState.capacityForTask) capactiyForTasks$: Observable<number>;

  fromDate: string = format(new Date(), 'dd.MM.yyyy');
  toDate: string = format(addWeeks(new Date(), 1), 'dd.MM.yyyy');

  newModalOpen: boolean;
  editModalOpen: boolean;
  teamMemberToEdit: TeamMember;

  constructor(private readonly store: Store) {
  }

  onWorkingHoursChange(hours: string): void {
    this.store.dispatch(new NewWorkingHours(parseInt(hours, 0)));
  }

  onDateChange(from: string, to: string): void {
    this.store.dispatch(new NewDate(from, to));
  }

  onAddTeamMember(name: string, daysOf: string, workingTime: string) {
    this.store.dispatch(new NewTeamMember(name, parseInt(daysOf, 0), parseInt(workingTime, 0)));
    this.newModalOpen = false;
    this.clearAddTeamMemberModal();
  }

  onWorkWeekChange(workWeek: string): void {
    this.store.dispatch(new NewWorkingWeek(parseInt(workWeek, 0)));
  }

  onCapactiyForTasksChange(capactiyForTasks: string): void {
    this.store.dispatch(new NewCapacityForTasks(parseInt(capactiyForTasks, 0)));
  }

  onDeleteTeamMember(teammember: TeamMember) {
    this.store.dispatch(new DeleteTeamMember(teammember));
  }

  onEditTeamMember(name: string, daysOf: string, workingTime: string) {
    this.store.dispatch(new EditTeamMember(name, parseInt(daysOf, 0), parseInt(workingTime, 0)));
    this.editModalOpen = false;
    this.teamMemberToEdit = null;
  }

  openEditTeamMemberModal(teammember: TeamMember) {
    this.teamMemberToEdit = teammember;
    this.editModalOpen = true;
  }

  private clearAddTeamMemberModal(): void {
    this.newNameInput.nativeElement.value = '';
    this.newDaysOfInput.nativeElement.value = '0';
    this.newDaysOfInput.nativeElement.value = '0';
    this.workingTimeInput.nativeElement.value = '100';
  }

}
