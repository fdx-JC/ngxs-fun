// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls: {
    whoIsSupportingApi: {
      base: 'http://127.0.0.1:3000',
      getUsers: 'get-users',
      getProjects: 'get-projects',
    },
  },
  azureAd: {
    msalRedirectUri: location.origin,
    clientId: '88730fca-9d8d-4eaa-a607-66bf6aa8afdf',
    authority:
      'https://login.microsoftonline.com/b48a9eab-75aa-4a5b-9fd7-f39223245c1a',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
