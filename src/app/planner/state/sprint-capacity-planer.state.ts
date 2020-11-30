import { Action, Selector, State, StateContext } from "@ngxs/store";

import { SprintCapacityPlanerStateModel } from "./sprint-capacity-planer-state.model";
import {
  CalcCapacity,
  DeleteTeamMember,
  EditTeamMember,
  NewCapacityForTasks,
  NewDate,
  NewTeamMember,
  NewWorkingHours,
  NewWorkingWeek,
} from "./sprint-capacity-planer.actions";

import { format, addWeeks, parse, differenceInWeeks } from "date-fns";
import { Injectable } from "@angular/core";
import { CalculationService } from "../services/calculation.service";
import { TeamMember } from "../../model/teammember.model";

@State<SprintCapacityPlanerStateModel>({
  name: "sprint_capacity",
  defaults: {
    from: format(new Date(), "dd.MM.yyyy"),
    to: format(addWeeks(new Date(), 1), "dd.MM.yyyy"),
    workingHours: 8,
    capacity: 0,
    teamMember: [],
    sprintLength: 1,
    workWeek: 5,
    capacityForTask: 60,
    scrumTeams: [],
  },
})
@Injectable()
export class SprintCapacityPlanerState {
  constructor(private calculationService: CalculationService) {}

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
  newWorkingHours(
    ctx: StateContext<SprintCapacityPlanerStateModel>,
    action: NewWorkingHours
  ) {
    ctx.patchState({
      workingHours: action.workingHours,
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewWorkingWeek)
  newWorkingWeekHandler(
    ctx: StateContext<SprintCapacityPlanerStateModel>,
    action: NewWorkingWeek
  ) {
    ctx.patchState({
      workWeek: action.workingWeek,
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewCapacityForTasks)
  newCapacityForTasks(
    ctx: StateContext<SprintCapacityPlanerStateModel>,
    action: NewCapacityForTasks
  ) {
    ctx.patchState({
      capacityForTask: action.capacityForTasks,
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewTeamMember)
  newTeamMember(
    ctx: StateContext<SprintCapacityPlanerStateModel>,
    action: NewTeamMember
  ) {
    const state = ctx.getState();
    const newTeamMember = {
      name: action.name,
      daysOf: action.daysOf,
      workingTimeInPercent: action.workingTime,
      isMoD: action.isMod,
    } as TeamMember;
    ctx.patchState({
      teamMember: [...state.teamMember, newTeamMember],
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(NewDate)
  newDate(ctx: StateContext<SprintCapacityPlanerStateModel>, action: NewDate) {
    const length = differenceInWeeks(
      parse(action.to, "dd.MM.yyyy", new Date()),
      parse(action.from, "dd.MM.yyyy", new Date())
    );
    ctx.patchState({
      from: action.from,
      to: action.to,
      sprintLength: length,
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(CalcCapacity)
  async calcCapacityHandler(ctx: StateContext<SprintCapacityPlanerStateModel>) {
    const state = ctx.getState();
    const newCapacity = await this.calculationService.calcCapacity(
      state.teamMember,
      state.workingHours,
      state.workWeek,
      state.capacityForTask,
      state.from,
      state.to
    );
    ctx.patchState({
      capacity: newCapacity,
    });
  }

  @Action(DeleteTeamMember)
  deleteTeamMemberHandler(
    ctx: StateContext<SprintCapacityPlanerStateModel>,
    action: DeleteTeamMember
  ) {
    const state = ctx.getState();
    const newTeamMember = state.teamMember.filter((value, index, array) => {
      if (value.name !== action.teamMember.name) {
        return value;
      }
    });
    ctx.patchState({
      teamMember: newTeamMember,
    });

    return ctx.dispatch(new CalcCapacity());
  }

  @Action(EditTeamMember)
  editTeamMemberHandler(
    ctx: StateContext<SprintCapacityPlanerStateModel>,
    action: EditTeamMember
  ) {
    const state = ctx.getState();
    const newTeamMember: TeamMember[] = [];
    for (const member of state.teamMember) {
      if (member.name === action.name) {
        newTeamMember.push({
          name: action.name,
          daysOf: action.daysOf,
          workingTimeInPercent: action.workingTime,
          isMoD: action.isMoD,
        } as TeamMember);
      } else {
        newTeamMember.push(member);
      }
    }
    ctx.patchState({
      teamMember: newTeamMember,
    });

    return ctx.dispatch(new CalcCapacity());
  }
}
