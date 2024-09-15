import useApiResponse from "./useApiResponse";
import useToast from "./useToast";

const useCrud = () => {

    const { showToast } = useToast();
    
    const { handleApiResponse } = useApiResponse();

    const handleError = (error: any) => {
        showToast(error.message || "An unexpected error occurred", "warning");
    };



}

export default useCrud;