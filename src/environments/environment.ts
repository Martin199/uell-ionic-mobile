// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://uellapidev.newton-development.com/',
  env: 'dev',
  version: '1.1',
  httpTimeout: 60000,
  apiVersion: 'v2',
  maxImageSize: 1024 * 1024 * 5, // 5MB
  aws: {
    clientId: '6msv5nde08td7pv7r0q90fulh6',
    userPoolId: 'us-east-1_pJB4tmUgT',
  },
  cognito: {
    userPoolId: 'us-east-1_2QXHj8Dwv',
    clientId: '3qj9j0q6vqgj6qk8b4gq7c4q5v',
    identityPoolId: 'us-east-1:5c6c7c4f-1d5b-4c6f-9f5a-8d5e7c4b1d5b',
    region: 'us-east-1',
  },
  googleMapsApiKey: 'AIzaSyBGCT0YarM7z7ZMlTvrVZ6wUTKz-FSVQhk',
};

