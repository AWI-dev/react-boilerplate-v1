import { useRef } from "react";
import { useAccessTokenState } from "../lib/StateManager/storeState";
import { RequestData } from "../lib/Type/systemTypes";

const useCrud = () => {


    const { accessToken } = useAccessTokenState();

    const controllerRef = useRef<AbortController | null>(null);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
    };

    const prepareAbortController = (isAbortController: boolean) => {
        if (isAbortController) {
            controllerRef.current?.abort();  // Abort the previous request if it exists
            controllerRef.current = new AbortController();  // Create a new controller
            return controllerRef.current.signal;  // Return the signal to attach to the request
        }
        return undefined;
    };

    const handleError = (error: any) => {
        console.error("Error caught:", error?.message);
        throw error;
    };

    //#region CRUD Methods
    const GET = async (endpoint: string, isAbortController: boolean = true) => {
        const signal = prepareAbortController(isAbortController);
        console.log('accessToken', accessToken);
        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers,
                signal,
            });

            if (!response.ok) {
                const errorData = await response.json();
                handleError(errorData);
            }

            return await response.json();
        } catch (error: any) {
            handleError(error);
        }
    };
    const POST = async (
        endpoint: string,
        requestData: RequestData | FormData,
        isAbortController: boolean = true
    ) => {
        const signal = prepareAbortController(isAbortController);
        const requestOptions: RequestInit = {
            method: "POST",
            headers: requestData instanceof FormData ? {} : headers, // Do not set Content-Type for FormData
            body: requestData instanceof FormData ? requestData : JSON.stringify(requestData),
            signal,
        };
        try {
            const response = await fetch(endpoint, requestOptions);

            if (!response.ok) {
                const errorData = await response.json();
                handleError(errorData);
            }

            return await response.json();
        } catch (error: any) {
            console.error("Error caught:", error?.message);
            handleError(error);
        }
    };
    //#endregion
    return { GET, POST };
};

export default useCrud;
