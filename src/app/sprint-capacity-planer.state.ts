import {Action, Selector, State, StateContext} from '@ngxs/store';

import {SprintCapacityPlanerStateModel} from './sprint-capacity-planer-state.model';
import {
  CalcCapacity,
  DeleteTeamMember,
  EditTeamMember,
  NewCapacityForTasks,
  NewDate,
  NewTeamMember,
  NewWorkingHours,
  NewWorkingWeek
} from './sprint-capacity-planer.actions';
import {TeamMember} from './teammember.model';
import * as moment from 'moment';

@State<SprintCapacityPlanerStateModel>({
    name: 'sprint_capacity',
    defaults: {
      from: moment().format('DD.MM.YYYY'),
      to: moment().add({week: 1}).format('DD.MM.YYYY'),
      workingHours: 8,
      capacity: 0,
      teamMember: [],
      sprintLength: 1,
      workWeek: 5,
      capacityForTask: 60
    }
  }
)
export class SprintCapacityPlanerState {

  @Selector()
  static workingHours(state: SprintCapacityPlanerStateModel) {
    return state.workingHours;
  }

  @Selector()
  static capacity(state: SprintCapacityPlanerStateModel) {
    return state.capacity;
  }

  @Selector()
  static capacityInPercentage(state: SprintCapacityPlanerStateModel) {
    return (state.capacityForTask * state.capacity) / 100;
  }

  @Selector()
  static teammembers(state: SprintCapacityPlanerStateModel) {
    return state.teamMember;
  }

  @Selector()
  static from(state: SprintCapacityPlanerStateModel) {
    return state.from;
  }

  @Selector()
  static to(state: SprintCapacityPlanerStateModel) {
    return state.to;
  }

  @Selector()
  static sprintLength(state: SprintCapacityPlanerStateModel) {
    return state.sprintLength;
  }

  @Selector()
  static workWeek(state: SprintCapacityPlanerStateModel) {
    return state.workWeek;
  }

  @Selector()
  static capacityForTask(state: SprintCapacityPlanerStateModel) {
    return state.capacityForTask;
  }

  @Action(NewWorkingHours)
  newWorkingHours(ctx: StateContext<SprintCapacityPlanerStateModel>, action: NewWorkingHours) {
    const state = ctx.getState();
    ctx.patchState({
      workingHours: action.workingHours
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewWorkingWeek)
  newWorkingWeekHandler(ctx: StateContext<SprintCapacityPlanerStateModel>, action: NewWorkingWeek) {
    const state = ctx.getState();
    ctx.patchState({
      workWeek: action.workingWeek
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewCapacityForTasks)
  newCapacityForTasks(ctx: StateContext<SprintCapacityPlanerStateModel>, action: NewCapacityForTasks) {
    const state = ctx.getState();
    ctx.patchState({
      capacityForTask: action.capacityForTasks
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewTeamMember)
  newTeamMember(ctx: StateContext<SprintCapacityPlanerStateModel>, action: NewTeamMember) {
    const state = ctx.getState();
    const newTeamMember = {name: action.name, daysOf: action.daysOf, workingTimeInPercent: action.workingTime} as TeamMember;
    ctx.patchState({
      teamMember: [
        ...state.teamMember,
        newTeamMember,
      ]
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewDate)
  newDate(ctx: StateContext<SprintCapacityPlanerStateModel>, action: NewDate) {
    const state = ctx.getState();
    const length = moment(action.to, 'DD.MM.YYYY').diff(moment(action.from, 'DD.MM.YYYY'), 'weeks');
    ctx.patchState({
      from: action.from,
      to: action.to,
      sprintLength: length
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(CalcCapacity)
  calcCapacityHandler(ctx: StateContext<SprintCapacityPlanerStateModel>) {
    const state = ctx.getState();
    const newCapacity = this.calcCapacity(state.teamMember, state.workingHours, state.workWeek, state.capacityForTask, state.from, state.to);
    ctx.patchState({
      capacity: newCapacity
    });
  }

  @Action(DeleteTeamMember)
  deleteTeamMemberHandler(ctx: StateContext<SprintCapacityPlanerStateModel>, action: DeleteTeamMember) {
    const state = ctx.getState();
    const newTeamMember = state.teamMember.filter(((value, index, array) => {
      if (value.name !== action.teamMember.name) {
        return value;
      }
    }));
    ctx.patchState({
      teamMember: newTeamMember
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(EditTeamMember)
  editTeamMemberHandler(ctx: StateContext<SprintCapacityPlanerStateModel>, action: EditTeamMember) {
    const state = ctx.getState();
    let newTeamMember: TeamMember[] = [];
    for (const member of state.teamMember) {
      if (member.name === action.name) {
        newTeamMember.push({name: action.name, daysOf: action.daysOf, workingTimeInPercent: action.workingTime} as TeamMember);
      } else {
        newTeamMember.push(member);
      }
    }
    ctx.patchState({
      teamMember: newTeamMember
    });

    return ctx.dispatch(new CalcCapacity());
  }

  private calcCapacity(teammembers: TeamMember[], workingsHours: number, workWeek: number, capacityForTasks: number, from: string, to: string): number {
    const sprintLength = moment(to, 'DD.MM.YYYY').diff(moment(from, 'DD.MM.YYYY'), 'weeks');
    let newCapacity = 0;
    for (const teammember of teammembers) {
      const memberCapacity = (this.calcTeamMemberWorkDay(workingsHours, teammember.workingTimeInPercent) * ((workWeek * sprintLength) - teammember.daysOf));
      console.log(memberCapacity);
      newCapacity = newCapacity + memberCapacity;
    }

    return newCapacity;
  }

  private calcTeamMemberWorkDay(workingHours: number, workingTimeInPercent): number {
    const memberWorkDay = (workingHours * workingTimeInPercent) / 100;
    console.log('Member work day: ', memberWorkDay);
    return memberWorkDay;
  }

}
