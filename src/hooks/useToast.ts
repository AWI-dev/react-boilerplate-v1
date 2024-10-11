import { toast } from "react-toastify";

const useToast = () => {

    const showToast = (message: string, type: "success" | "warning" | "info" | "error") => {
        toast[type](message, {
            theme: "colored",
            className: `!bg-${type}`,
        });
    };

    return { showToast };
};

export default useToast;
