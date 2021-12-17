import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISprint } from 'src/types/sprint.type';

const { whoIsSupportingApi } = environment.urls;

@Injectable()
export class SprintService {
  constructor(private http: HttpClient) {}
  getProjects(): Observable<ISprint[]> {
    const url = `${whoIsSupportingApi.base}/${whoIsSupportingApi.getProjects}`;

    return this.http.get<{ data: ISprint[] }>(url).pipe(
      map((response) => {
        return response.data;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
