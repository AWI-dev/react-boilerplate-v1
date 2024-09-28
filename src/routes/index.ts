import { lazy } from "react";

const coreRoutes = [
    {
        path: "/dashboard",
        title: "Audit Form Summary",
        component: lazy(
            () => import("../pages/Dashboard/Dashboard")
        ),
    },
    {
        path: "/accounts",
        title: "Account List",
        component: lazy(
            () => import("../pages/Account/AccountList")
        ),
    },
];

const routes = [...coreRoutes];
export default routes;