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
    {
        path: "/system-management",
        title: "System Management",
        component: lazy(
            () => import("../pages/SystemManagement/Systems")
        ),
    },
    {
        path: "/system-management-dashboard/:system?",
        title: "System Management-dashboard",
        component: lazy(
            () => import("../pages/SystemManagement/SystemManagementDashboard")
        ),
    },


];

const routes = [...coreRoutes];
export default routes;