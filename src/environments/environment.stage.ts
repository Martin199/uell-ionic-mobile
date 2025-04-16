export const environment = {
  production: false,
  apiBaseUrl: 'https://apistage.uell.newton-development.com/',
  version: '0.1',
  env: 'stage',
  httpTimeout: 60000,
  apiVersion: 'v2',
  maxImageSize: 1024 * 1024 * 5, // 5MB
  aws: {
    clientId: '247svd02gbu18j7pgepn2v9vqk',
    userPoolId: 'us-east-1_C8KOLsIvS',
  },
  cognito: {
    userPoolId: 'us-east-1_C8KOLsIvS',
    clientId: '247svd02gbu18j7pgepn2v9vqk',
    identityPoolId: 'us-east-1:17f920e7-a136-4345-b445-9c16c0c3906c',
    region: 'us-east-1',
  },
  googleMapsApiKey: 'AIzaSyBGCT0YarM7z7ZMlTvrVZ6wUTKz-FSVQhk',
};

