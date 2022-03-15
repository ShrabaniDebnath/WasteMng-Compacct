window.config = {
    production: false,
    baseUrl: 'https://tutopiacallaz.azurewebsites.net/api',
    urlDatbase : '/Mobile_Func_Adv',
    urlcode : '?code=CLSiAdJbe7iil5hQ9n8aVAOmiFt3KPjk2AnARj3vaY7mjKSsHBxSmg=='
    // baseUrl: 'https://hytoneazmain.azurewebsites.net/api',
    // urlDatbase: '/CommonFunc',
    // urlcode: '?code=INEvOcX8o/iXaUfI031hRZNMnhaPT0GGI8tTm8Ia4oXEmR/ONbFAoA=='
};
window.api = {
    TutopiacallDataBaseUrl: `${window.config.baseUrl+window.config.urlDatbase+window.config.urlcode}`
}