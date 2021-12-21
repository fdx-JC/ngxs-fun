import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Project } from './store/projects/projects.actions';
import { ISprintProject, ProjectState } from './store/projects/projects.state';

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
  @Select(ProjectState.selectCurrentSprintIndex)
  currentIndex$: Observable<number>;
  @Select(ProjectState.selectSprintsTotal)
  total$: Observable<number>;

  projectSubscription: Subscription = new Subscription();
  index: number;
  isFirst: boolean;
  isLast: boolean;
  currentSprintDate: string;
  sprintPosition: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Project.GetProjects());

    this.projectSubscription = combineLatest([
      this.currentIndex$,
      this.total$,
      this.sprints$,
    ]).subscribe(([index, total, sprints]) => {
      this.index = index;
      this.isFirst = index === 0;
      this.isLast = index + 1 === total;
      this.sprintPosition = (100 * (index + 1)) / total;
      this.currentSprintDate = Object.keys(sprints)[index];
    });
  }

  updateCurrentSprint(index: number): void {
    this.store.dispatch(new Project.SetCurrentSprint(index));
  }

  nextSprint() {
    // this.index = this.index + 1;
    this.updateCurrentSprint(this.index + 1);
  }

  prevSprint() {
    this.updateCurrentSprint(this.index - 1);
  }

  trackByFn(index: number) {
    return index;
  }

  ngOnDestroy(): void {
    this.projectSubscription?.unsubscribe();
  }
}
