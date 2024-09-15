import { type ReactNode } from "react";

//#region  Breadcrumbs
type BreadcrumbItem = {
    name: any;
    path?: string;
};

export type BreadcrumbProps = {
    items?: BreadcrumbItem[];
    pageName: string;
};
//#endregion

//#region Provider
export type TProviderProps = {
    children: ReactNode;
    className?: string;
}
//#endregion

//#region  Logo
export type TLogoProps = {
    className?: string | null;
    size?: number
}
//#endregion

//#region Sidebar
export type TSidebarItemProps = {
    title: string;
    path: string;
    icon: ReactNode
}
type TSidebarGroupItem = {
    title: string;
    path: string;
};
export type TSidebarItemGroupProps = {
    title: string;
    children: TSidebarGroupItem[];
    icon: ReactNode;
};
//#endregion

//#region

//#endregion




