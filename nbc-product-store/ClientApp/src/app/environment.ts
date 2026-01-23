// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
  production: false,
  // Known backend endpoints
  backends: {
    dotnet: 'https://localhost:7050',
    java: 'http://localhost:8080'
  },
  defaultBackend: 'dotnet',
  apiUrl: 'https://localhost:7050'
};
