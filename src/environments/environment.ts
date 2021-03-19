// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  API_Covid_World : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/World',
  API_Covid_Continents : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Continents',
  API_Covid_Countries_All : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/ALL',
  API_Covid_Countries_NA : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/NA',
  API_Covid_Countries_SA : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/SA',
  API_Covid_Countries_EU : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/EU',
  API_Covid_Countries_AS : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/AS',
  API_Covid_Countries_AF : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/AF',
  API_Covid_Countries_OC : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/OC',
  API_Covid_JustCountries : 'https://covid19backend.herokuapp.com/com.Samuel.sscovid19.api/Countries/justCountries',

  API_World_Historical_All : 'https://disease.sh/v3/covid-19/historical/all?lastdays=all',

  API_BUY_ME_COFEE_URL_MY_PAGE : 'https://www.buymeacoffee.com/sscovid19',
  API_BUY_ME_COFEE_URL_ABOUT : 'https://www.buymeacoffee.com/about'
                               
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
