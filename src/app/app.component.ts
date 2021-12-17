import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { SprintService } from 'src/services/project.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngxs-fun';
  sub: Subscription = new Subscription();
  constructor(private sprintService: SprintService) {}

  ngOnInit(): void {
    this.sub = this.sprintService
      .getProjects()
      .subscribe((data) => console.log('....................', data));
  }
}
