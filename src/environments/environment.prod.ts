export const environment = {
  production: true,
  urls: {
    whoIsSupportingApi: {
      base: 'https://qa.supporting.digital-backend.findex.dev',
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
