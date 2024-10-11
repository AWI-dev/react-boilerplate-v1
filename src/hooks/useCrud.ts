import { useRef } from "react";
import { RequestData } from "../lib/Type/systemTypes";
import { useAuthHeaders } from "../lib/utils/getHeaders";

const useCrud = () => {

    const { getHeaders } = useAuthHeaders();

    const controllerRef = useRef<AbortController | null>(null);

    const prepareAbortController = (isAbortController: boolean) => {
        if (isAbortController) {
            controllerRef.current?.abort();  // Abort the previous request if it exists
            controllerRef.current = new AbortController();  // Create a new controller
            return controllerRef.current.signal;  // Return the signal to attach to the request
        }
        return undefined;
    };

    const handleError = (error: any) => {
        return {
            success: false,
            message: error.message || "Network error occurred.",
        };
    };

    //#region CRUD Methods

    const GET = async (endpoint: string, isAbortController: boolean = true) => {
        const signal = prepareAbortController(isAbortController);
        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: getHeaders(),
                signal,
            });
            if (!response.ok) {
                const errorData = await response.json();
                handleError(errorData);
                return {
                    success: false,
                    message: errorData.message || "Request failed.",
                };
            }
            const data = await response.json();
            return {
                success: true,
                data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || "Network error occurred.",
            };
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
            headers: requestData instanceof FormData ? {} : getHeaders(), // Do not set Content-Type for FormData
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
