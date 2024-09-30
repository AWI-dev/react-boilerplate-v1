
export type TPrivateRouteProps = {
    children: JSX.Element; // The component to render if authenticated and authorized
    redirect?: string; // Optional redirect path
    allowedRoles?: string[]; // Optional array of roles allowed to access the route
};

export type TAccessTokenProps = {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    removeAccessToken: () => void;
}
export type TAuthProps = {
    email: string;
    password: string;
}

export type RequestData = Record<string, any>;


//#region

//#endregion