import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, tap } from 'rxjs';
import { IProject } from '../models/project.model';
import { Project } from './store/projects/projects.actions';
import { ProjectState } from './store/projects/projects.state';
import groupBy from 'lodash/groupBy';
import { isCurrentDateRange } from '../utils/date-helper';

interface IProjectSprint {
  [sprintDate: string]: IProject[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @Select(ProjectState.selectLoadingProjects)
  loading$: Observable<boolean>;
  @Select(ProjectState.selectAllProjects) projects$: Observable<IProject[]>;

  currentSprint: IProject[];
  currentSprintDate: string;
  sprints: IProjectSprint;

  projectSubscription: Subscription = new Subscription();
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentSprint = this.sprints?.[0];

    this.projectSubscription = this.projects$.subscribe((data) => {
      this.sprints = groupBy(data, 'sprint');

      Object.keys(this.sprints).find((key) => {
        const dates = key.split('-');
        const startDate = dates[0].trim();
        const endDate = dates[1].trim();

        if (isCurrentDateRange(startDate, endDate)) {
          this.currentSprintDate = key;
          this.currentSprint = this.sprints[key];
        }
      });
    });

    this.store.dispatch(new Project.GetProjects());
  }

  ngOnDestroy(): void {
    this.projectSubscription?.unsubscribe();
  }
}
