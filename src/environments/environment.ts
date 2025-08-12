// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://dev-api.eks.development.uell.ai/',
  env: 'dev',
  version: '1.2',
  httpTimeout: 60000,
  apiVersion: 'v2',
  maxImageSize: 1024 * 1024 * 5, // 5MB
  aws: {
    clientId: '3i1h3ij8gn0k6fnr2qlrcj9g7g',
    userPoolId: 'us-east-1_mzC2U2zzh',
  },
  googleMapsApiKey: 'AIzaSyBGCT0YarM7z7ZMlTvrVZ6wUTKz-FSVQhk',
};

