import { createWebHistory, createRouter } from "vue-router";

/* Main Layouts */
const AuthLayout = () => import("@/components/Layouts/AuthLayout.vue");
const GuestLayout = () => import("@/components/Layouts/GuestLayout.vue");
/* Main Layouts */


/* Guest Component */
const Home = () => import("@/components/GuestPages/Home.vue");
const Login = () => import("@/components/GuestPages/Login.vue");
/* Guest Component */

/* Authenticated Component */
const Dashboard = () => import("@/components/AuthPages/Dashboard.vue");
/* Authenticated Component */
const routes = [
    {
        path: "/",
        component: GuestLayout,
        meta: {
            middleware: "guest",
        },
        children: [
            {
                name: "home",
                path: "/",
                component: Home,
                meta: {
                    title: `Home`,
                },
            },
            {
                name: "login",
                path: "/login",
                component: Login,
                meta: {
                    title: `Login`,
                },
            },
        ],
    },

    {
        path: "/app",
        component: AuthLayout,
        meta: {
            middleware: "auth",
        },
        children: [
            {
                name: "dashboard",
                path: "/app/dashboard",
                component: Dashboard,
                meta: {
                    title: `Dashboard`,
                    ability: "",
                },
            },
        ],
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes, 
    watch: {
        $route(to) {
            if (to.currentRoute.meta.reload == true) {
                window.location.reload();
            }
        },
    },
    scrollBehavior() {
        document.getElementById("app").scrollIntoView();
    },
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
    // if (to.meta.middleware == "guest") {
    //     if (store.state.auth.authenticated) {
    //         next({ name: "dashboard" });
    //     }
    //     next();
    // } else {
    //     next();
    // }
});

export default router;