import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import groupBy from 'lodash/groupBy';

import { LoadableStatus } from 'src/app/models/meta';
import { IProject, IRosterItem } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.services';
import { Project } from './projects.actions';
import { isCurrentDateRange } from 'src/app/utils/date-helper';
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from '@ngxs/store/operators';

export interface ISprintProject {
  [sprintDate: string]: IProject[];
}

export class ProjectStateModel {
  entities: ISprintProject;
  currentSprint: number;
  total: number;
  status: LoadableStatus | null;
  message: string;
}

@State<ProjectStateModel>({
  name: 'projectState',
  defaults: {
    entities: {},
    currentSprint: 0,
    total: 0,
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

  @Selector()
  static selectCurrentSprintProjects(state: ProjectStateModel): IProject[] {
    const currentSprintKey = Object.keys(state.entities)[state.currentSprint];
    return state.entities[currentSprintKey] ?? null;
  }

  @Selector()
  static selectCurrentSprintUnallocated(
    state: ProjectStateModel
  ): string[] | null {
    const currentSprint = this.selectCurrentSprintProjects(state);
    const rosters = currentSprint.find(
      (project) => project.name === 'Unallocated'
    )?.roster;
    return rosters?.map((roster) => roster.email) ?? null;
  }

  @Action(Project.GetProjects)
  getDataFromServer(ctx: StateContext<ProjectStateModel>) {
    ctx.patchState({ status: LoadableStatus.Loading });

    return this.projectService.getProjects().pipe(
      tap((data) => {
        const sprintProjects = groupBy(data, 'sprint');

        ctx.patchState({
          status: LoadableStatus.Loaded,
          entities: sprintProjects,
          currentSprint: defaultCurrentSprint(sprintProjects),
          total: Object.keys(sprintProjects).length,
        });
      }),
      catchError(() => {
        return of(
          ctx.patchState({
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

  @Action(Project.RemoveRosterFromProject)
  removeDataFromState(
    ctx: StateContext<ProjectStateModel>,
    action: { roster: IRosterItem; projectSprintId: string }
  ) {
    const state = ctx.getState();
    const currentSprintKey = Object.keys(state.entities)[state.currentSprint];

    // move roster to unallocated
    ctx.setState(
      patch<ProjectStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<IProject>(
            (project) => project?.name === 'Unallocated',
            patch<IProject>({
              roster: insertItem<IRosterItem>(action.roster),
            })
          ),
        }),
      })
    );
    // remove it from the sprint project
    return ctx.setState(
      patch<ProjectStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<IProject>(
            (project) => project?.tableId === action.projectSprintId,
            patch<IProject>({
              roster: removeItem<IRosterItem>(
                (roster) => roster?.email === action.roster.email
              ),
            })
          ),
        }),
      })
    );
  }

  @Action(Project.AddRosterToProject)
  addDataToState(
    ctx: StateContext<ProjectStateModel>,
    action: { roster: IRosterItem; projectSprintId: string }
  ) {
    const state = ctx.getState();
    const currentSprintKey = Object.keys(state.entities)[state.currentSprint];

    // remove from unallocated
    ctx.setState(
      patch<ProjectStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<IProject>(
            (project) => project?.name === 'Unallocated',
            patch<IProject>({
              roster: removeItem<IRosterItem>(
                (roster) => roster?.email === action.roster.email
              ),
            })
          ),
        }),
      })
    );

    return ctx.setState(
      patch<ProjectStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<IProject>(
            (project) => project?.tableId === action.projectSprintId,
            patch<IProject>({
              roster: insertItem<IRosterItem>(action.roster),
            })
          ),
        }),
      })
    );
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
