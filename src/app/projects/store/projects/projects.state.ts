import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoadableStatus } from 'src/app/models/meta';
import { IProject } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.services';
import { Project } from './projects.actions';

export class ProjectStateModel {
  sprints: IProject[] | null;
  status: LoadableStatus | null;
  message: string;
}

@State<ProjectStateModel>({
  name: 'projectState',
  defaults: {
    sprints: null,
    status: null,
    message: '',
  },
})
@Injectable()
export class ProjectState {
  constructor(private projectService: ProjectService) {}

  @Selector()
  static selectLoadingProjects(state: ProjectStateModel) {
    return state.status === LoadableStatus.Loading;
  }

  @Selector()
  static selectAllProjects(state: ProjectStateModel) {
    return state.sprints;
  }

  @Action(Project.GetProjects)
  getDataFromState(ctx: StateContext<ProjectStateModel>) {
    const state = ctx.getState();
    ctx.patchState({ status: LoadableStatus.Loading });

    return this.projectService.getProjects().pipe(
      tap((data) => {
        ctx.setState({
          ...state,
          status: LoadableStatus.Loaded,
          sprints: data,
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
}
