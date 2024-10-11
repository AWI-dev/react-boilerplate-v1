import useToast from "./useToast";

const useApiResponse = () => {

    const { showToast } = useToast();
    const handleApiResponse = (response: any, isToast: boolean = true) => {
        if (isToast) {
            if (response.success) {
                showToast(response.success.message, "success");
                // return response.success.data;
            } else {
                showToast(response.error.message, "warning");
            }
        }
        return response?.success?.data;
    };

    return { handleApiResponse }
}
export default useApiResponse;