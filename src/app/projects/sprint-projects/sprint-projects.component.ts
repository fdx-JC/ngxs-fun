import { Component, Input, OnInit } from '@angular/core';
import { IProject } from 'src/app/models/project.model';

@Component({
  selector: 'app-sprint-projects',
  templateUrl: './sprint-projects.component.html',
  styleUrls: ['./sprint-projects.component.scss'],
})
export class SprintProjectsComponent implements OnInit {
  @Input() sprintProjects: IProject[];

  constructor() {}

  ngOnInit(): void {}
}
