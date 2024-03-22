import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiURL: 'http://localhost:8080/api/v1/',
  apiUrlAuth:'http://localhost:8080/api/v1/auth/'
};

