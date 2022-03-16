import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProject } from '../models/project.model';

const whoIsSupportingApi = environment.urls.whoIsSupportingApi;

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) {}
  getProjects(): Observable<IProject[]> {
    const url = `${whoIsSupportingApi.base}/${whoIsSupportingApi.getProjects}`;

    return this.http.get<{ data: IProject[] }>(url).pipe(
      map((response) => {
        return response.data;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
