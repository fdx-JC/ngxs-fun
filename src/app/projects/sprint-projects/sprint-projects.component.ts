import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProject } from 'src/app/models/project.model';
import { ProjectState } from '../store/projects/projects.state';

@Component({
  selector: 'app-sprint-projects',
  templateUrl: './sprint-projects.component.html',
  styleUrls: ['./sprint-projects.component.scss'],
})
export class SprintProjectsComponent {
  @Select(ProjectState.selectCurrentSprintProjects)
  projects$: Observable<IProject[]>;
}
