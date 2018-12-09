var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/foos/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
}

export default authConfig;