import { toast } from 'react-toastify';
export const showSuccess = (text = '') => {
    toast.success(text);
};
export const showError = (text = '') => {
    toast.error(text);
};
export const showWarning = (text = '') => {
    toast.warning(text);
};
