export const environment = {
  production: false,
  apiBaseUrl: 'https://qa-api.eks.development.uell.ai/',
  env: 'qa',
  version: '0.1',
  httpTimeout: 60000,
  apiVersion: 'v2',
  maxImageSize: 1024 * 1024 * 5, // 5MB
  aws: {
    clientId: '3h53imnpjvm0ehmkkh7vd6lj8o',
    userPoolId: 'us-east-1_VgovTfmV2',
  },
  cognito: {
    userPoolId: 'us-east-1_VgovTfmV2',
    clientId: '3h53imnpjvm0ehmkkh7vd6lj8o',
    identityPoolId: 'us-east-1:05548a1f-ce7c-4ec2-aad7-bb898328216c',
    region: 'us-east-1',
  },
  googleMapsApiKey: 'AIzaSyBGCT0YarM7z7ZMlTvrVZ6wUTKz-FSVQhk',
};

