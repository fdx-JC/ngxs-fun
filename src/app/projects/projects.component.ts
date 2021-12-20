import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription, tap } from 'rxjs';
import groupBy from 'lodash/groupBy';

import { IProject } from '../models/project.model';
import { Project } from './store/projects/projects.actions';
import {
  ICurrentSprint,
  ISprintProject,
  ProjectState,
} from './store/projects/projects.state';
import { isCurrentDateRange } from '../utils/date-helper';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @Select(ProjectState.selectLoadingSprintProjects)
  loading$: Observable<boolean>;
  @Select(ProjectState.selectSprintProjects)
  sprints$: Observable<ISprintProject>;
  @Select(ProjectState.selectCurrentSprint)
  currentSprint$: Observable<ICurrentSprint>;
  @Select(ProjectState.selectCurrentSprintIndex)
  currentIndex$: Observable<number>;
  @Select(ProjectState.selectSprintsTotal)
  total$: Observable<number>;

  projectSubscription: Subscription = new Subscription();
  constructor(private store: Store) {}

  index: number;
  isFirst: boolean;
  isLast: boolean;

  ngOnInit(): void {
    this.store.dispatch(new Project.GetProjects());

    this.projectSubscription = combineLatest([
      this.currentIndex$,
      this.total$,
    ]).subscribe(([index, total]) => {
      this.index = index;
      this.isFirst = index === 0;
      this.isLast = index + 1 === total;
    });
  }

  updateCurrentSprint(index: number): void {
    this.store.dispatch(new Project.SetCurrentSprint(index));
  }

  nextSprint() {
    // this.index = this.index + 1;
    this.store.dispatch(new Project.SetCurrentSprint(this.index + 1));
  }

  prevSprint() {
    // this.index = this.index - 1;
    this.store.dispatch(new Project.SetCurrentSprint(this.index - 1));
  }

  ngOnDestroy(): void {
    this.projectSubscription?.unsubscribe();
  }
}
