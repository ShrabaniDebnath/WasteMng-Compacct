export const environment = {
  production: true,
  baseUrl: 'https://tutopiacallaz.azurewebsites.net/api/',
  urlDatbase : 'Mobile_Func_Adv',
  urlcode : 'code=CLSiAdJbe7iil5hQ9n8aVAOmiFt3KPjk2AnARj3vaY7mjKSsHBxSmg=='
};
export const api = {
  TutopiacallDataBaseUrl : `${environment.baseUrl+environment.urlDatbase+environment.urlcode}`
 }