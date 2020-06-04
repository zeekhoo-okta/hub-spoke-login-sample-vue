import Vue from 'vue'
import Router from 'vue-router'
import 'semantic-ui-css/semantic.min.css'

import Auth from '@okta/okta-vue'

import HomeComponent from '@/components/Home'
import LoginComponent from '@/components/Login'
import ProfileComponent from '@/components/Profile'
import Authorize from '@/components/Authorize'

import config from '@/config'

Vue.use(Router)
Vue.use(Auth, config.oidc)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: HomeComponent
        },
        {
            path: '/login',
            component: LoginComponent
        },
        {
            path: '/profile',
            component: ProfileComponent
        },
        {
            path: '/oauth/callback',
            component: Auth.handleCallback()
        },
        {
            path: '/oauth/init',
            component: Authorize
        }
    ]
})

const onAuthRequired = async (from, to, next) => {
    if (from.matched.some(record => record.meta.requiresAuth) && !(await Vue.prototype.$auth.isAuthenticated())) {
        // Navigate to custom login page
        next({
            path: '/login'
        })
    } else {
        next()
    }
}

router.beforeEach(onAuthRequired)

export default router