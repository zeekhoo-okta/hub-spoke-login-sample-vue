<template>
    <div class="login">
        <div id="okta-signin-container"></div>
    </div>
</template>

<script>
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import config from "@/config";
export default {
    name: "Login",
    mounted: function() {
        this.$nextTick(function() {
            this.widget = new OktaSignIn({
                baseUrl: config.spoke,
                idpDiscovery: {
                    requestContext: "http://localhost:8080/oauth/init"
                },
                features: {
                    idpDiscovery: true
                }
            });
            this.widget.renderEl(
                { el: "#okta-signin-container" },
                res => {
                    if (res.status === "IDP_DISCOVERY") {
                        res.idpDiscovery.redirectToIdp();
                    } else {
                        res.session.setCookieAndRedirect("http://localhost:8080/oauth/init");
                    }
                },
                err => {
                    throw err;
                }
            );
        });
    },
    destroyed() {
        this.widget.remove();
    }
};
</script>