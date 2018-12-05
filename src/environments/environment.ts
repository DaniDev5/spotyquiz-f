// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  spotifyUrl: 'https://accounts.spotify.com/authorize',
  spotifyClientId: '92ed57a15a9d488285f45b9ef0c7714a',
  spotifyRedirectUri: 'http://localhost:4200/callback',
  serverUrl: 'http://localhost:8080',
  accessToken: 'Authorization'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
