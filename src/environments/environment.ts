// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`. https://tutopiacallaz.azurewebsites.net/api/Mobile_Func_Adv?code=CLSiAdJbe7iil5hQ9n8aVAOmiFt3KPjk2AnARj3vaY7mjKSsHBxSmg==&Report_Name=GET_Action_Type&Sp_Name=SP_Controller





export const environment = {
  production: false,
  baseUrl: 'https://tutopiacallaz.azurewebsites.net/api',
  urlDatbase : '/Mobile_Func_Adv',
  urlcode : '?code=CLSiAdJbe7iil5hQ9n8aVAOmiFt3KPjk2AnARj3vaY7mjKSsHBxSmg=='
};
export const api = {
 TutopiacallDataBaseUrl : `${environment.baseUrl+environment.urlDatbase+environment.urlcode}`
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
