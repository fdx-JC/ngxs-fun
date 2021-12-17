import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { IUser } from 'src/types/user.type';
import { environment } from 'src/environments/environment';

const { whoIsSupportingApi } = environment.urls;

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  getUsers(emails: string[]): Observable<IUser[]> {
    const encodedEmails = encodeURIComponent(emails.join(','));
    const url = `${whoIsSupportingApi.base}/${whoIsSupportingApi.getUsers}?userEmails=${encodedEmails}`;

    return this.http.get<{ data: any }>(url).pipe(
      map((response) => {
        const user = response.data.map((data: any) => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(data.userPhoto.data))
          );

          return {
            displayName: data.userDetails.displayName,
            mail: data.userDetails.mail.toLowerCase(),
            photo:
              data.userPhoto === 'Error'
                ? null
                : this.sanitizer.bypassSecurityTrustResourceUrl(
                    `data:image/jpeg;base64,${base64String}`
                  )
          };
        });

        return user;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
}
