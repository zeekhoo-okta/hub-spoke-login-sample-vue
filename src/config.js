export default {
  spoke: process.env.VUE_APP_SPOKE_ORG,
  idp: process.env.VUE_APP_IDP_ID,
  oidc: {
    clientId: process.env.VUE_APP_CLIENT_ID,
    issuer: process.env.VUE_APP_ISSUER,
    redirectUri: 'http://localhost:8080/oauth/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  }
}