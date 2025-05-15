export const environment = {
  production: true,
  apiBaseUrl: 'https://api.uell.com.ar/',
  env: 'prod',
  httpTimeout: 60000,
  version: '1.1',
  apiVersion: 'v2',
  maxImageSize: 1024 * 1024 * 5, // 5MB
  aws: {
    clientId: '16digork8oko8dpighavq0vngt',
    userPoolId: 'us-east-1_sCvFtJrhY',
  },
  cognito: {
    userPoolId: 'us-east-1_sCvFtJrhY',
    clientId: '16digork8oko8dpighavq0vngt',
    identityPoolId: 'us-east-1:17f920e7-a136-4345-b445-9c16c0c3906c',
    region: 'us-east-1',
  },
  googleMapsApiKey: 'AIzaSyBGCT0YarM7z7ZMlTvrVZ6wUTKz-FSVQhk',
};
