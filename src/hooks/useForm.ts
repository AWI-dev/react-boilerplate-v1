import { useState } from 'react';
import useCrud from './useCrud';
type UseFormReturn<T> = {
    formData: T;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAutoCompleteChange: (key: string, value: any) => void;
    createFormData: () => FormData;
    fetchAndSetFormData: (endpoint: string) => Promise<void>;
    resetFormData: () => void;
};

const useForm = <T extends Record<string, any>>(initialState: T): UseFormReturn<T> => {
const { GET } = useCrud();

    const [formData, setFormData] = useState<T>(initialState);

    console.log('formData', formData);
    

    // Handle input and textarea changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle select dropdown changes
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked ? 1 : 0,
        }));
    };

    // Handle auto-complete changes (for dropdowns or other auto-complete fields)
    const handleAutoCompleteChange = (key: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    // Create FormData from formData object
    const createFormData = (): FormData => {
        const newForm = new FormData();
        Object.keys(formData).forEach((key) => {
            const value: any = formData[key as keyof T];
            if (value !== undefined && value !== null) {
                newForm.append(key, value.toString());
            }
        });
        return newForm;
    };

    // Fetch and set form data from an endpoint
    const fetchAndSetFormData = async (endpoint: string) => {
        const res = await GET(endpoint);
        setFormData(res);
    };

    // Reset form data to initial state
    const resetFormData = () => {
        setFormData(initialState);
    };

    return {
        formData,
        handleInputChange,
        handleSelectChange,
        handleCheckboxChange,
        handleAutoCompleteChange,
        createFormData,
        fetchAndSetFormData,
        resetFormData,
    };
};

export default useForm;
