import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import groupBy from 'lodash/groupBy';

import { LoadableStatus } from 'src/app/models/meta';
import { IProject } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.services';
import { Project } from './projects.actions';
import { isCurrentDateRange } from 'src/app/utils/date-helper';

export interface ISprintProject {
  [sprintDate: string]: IProject[];
}

export class ProjectStateModel {
  entities: ISprintProject;
  currentSprint: number;
  total: number;
  sprints: IProject[] | null;
  status: LoadableStatus | null;
  message: string;
}

@State<ProjectStateModel>({
  name: 'projectState',
  defaults: {
    entities: {},
    currentSprint: 0,
    total: 0,
    sprints: null,
    status: null,
    message: '',
  },
})
@Injectable()
export class ProjectState {
  constructor(private projectService: ProjectService) {}

  @Selector()
  static selectLoadingSprintProjects(state: ProjectStateModel): boolean {
    return state.status === LoadableStatus.Loading;
  }

  @Selector()
  static selectSprintProjects(state: ProjectStateModel): ISprintProject {
    return state.entities;
  }

  @Selector()
  static selectCurrentSprintIndex(state: ProjectStateModel): number {
    return state.currentSprint;
  }

  @Selector()
  static selectSprintsTotal(state: ProjectStateModel): number {
    return state.total;
  }

  @Action(Project.GetProjects)
  getDataFromState(ctx: StateContext<ProjectStateModel>) {
    const state = ctx.getState();
    ctx.patchState({ status: LoadableStatus.Loading });

    return this.projectService.getProjects().pipe(
      tap((data) => {
        const sprintProjects = groupBy(data, 'sprint');

        ctx.setState({
          ...state,
          status: LoadableStatus.Loaded,
          sprints: data,
          entities: sprintProjects,
          currentSprint: defaultCurrentSprint(sprintProjects),
          total: Object.keys(sprintProjects).length,
        });
      }),
      catchError(() => {
        return of(
          ctx.setState({
            ...state,
            status: LoadableStatus.Error,
            message: 'Error occurred while loading projects',
          })
        );
      })
    );
  }

  @Action(Project.SetCurrentSprint)
  setDataInState(
    ctx: StateContext<ProjectStateModel>,
    action: { sprintKey: number }
  ) {
    return ctx.patchState({ currentSprint: action.sprintKey });
  }
}

// function to find the default current sprint
const defaultCurrentSprint = (sprints: ISprintProject): number => {
  const sprintKeys = Object.keys(sprints);
  let currentIndex = 0;
  sprintKeys.find((key) => {
    const dates = key.split('-');
    const startDate = dates[0].trim();
    const endDate = dates[1].trim();

    if (isCurrentDateRange(startDate, endDate)) {
      currentIndex = sprintKeys.indexOf(key);
    }
  });
  return currentIndex;
};
