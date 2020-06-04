<template>
    <div>OAuth Authorize</div>
</template>
<script>
import config from "@/config";
import AuthJs from "@okta/okta-auth-js";

export default {
    name: 'authorize',
    created() {
        const authClient = AuthJs({
            issuer: config.oidc.issuer,
            clientId: config.oidc.clientId,
            redirectUri: config.oidc.redirectUri
        });
        authClient.token.getWithRedirect({
            scopes: config.oidc.scopes,
            idp: config.idp
        });
    }
}
</script>