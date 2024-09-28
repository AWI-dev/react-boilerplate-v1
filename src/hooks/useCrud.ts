import { useRef } from "react";
/* import useApiResponse from "./useApiResponse";
import useToast from "./useToast"; */
import { useAccessTokenState } from "../lib/StateManager/storeState";
const useCrud = () => {
    // const { showToast } = useToast();
    // const { handleApiResponse } = useApiResponse();
    const { accessToken } = useAccessTokenState();

    /*  const handleError = (error: any) => {
         showToast(error.message || "An unexpected error occurred", "warning");
     }; */
    const controllerRef = useRef<AbortController>();

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    };

    //#region CRUD
    const GET = async (endpoint: string, isAbortController: boolean = true) => {
        if (isAbortController) {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
            controllerRef.current = new AbortController();
        }
        const signal = isAbortController
            ? controllerRef.current?.signal
            : undefined;
        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: headers,
                signal,
            });
            return response.json();
        } catch (error: any) {
            console.log("Error caught:", error?.message);
        }
    };

    type RequestData = Record<string, any>;

    const POST = async (
        endpoint: string,
        formData: RequestData,
        isAbortController: boolean = true
    ) => {
        if (isAbortController) {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
            controllerRef.current = new AbortController();
        }
        const signal = isAbortController
            ? controllerRef.current?.signal
            : undefined;
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: headers,
                body: (formData instanceof FormData ? formData : JSON.stringify(formData)),
                signal,
            });
            return response.json();
        } catch (error: any) {
            console.log("Error caught:", error?.message);
        }
    };
    //#endregion

    return { GET, POST };

}
export default useCrud;