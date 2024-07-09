import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useShowToast = () => {
    const showToast = ({ status, title, description }) => {
    const options = {
        type: status,
        position: 'top-center',
        description: description,
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    toast(title || 'Notification', options);
    if (description) {
        toast.info(description);
      }
    };
  
    return showToast;
};