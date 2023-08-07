// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'projeto',
  signInMethod: 'redirect', //redirect || popup
  author: 'Collab',
  authorUrl: 'https://github.com/Suparender/projeto-final-5-3.git',
  firebase: {
    apiKey: "AIzaSyA-jFk4VF8ubUUPMNr1DDjocLFs6x0jL60",
    authDomain: "dev-fire-7170d.firebaseapp.com",
    projectId: "dev-fire-7170d",
    storageBucket: "dev-fire-7170d.appspot.com",
    messagingSenderId: "566215526410",
    appId: "1:566215526410:web:53e32bab9f5dec204277f3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
