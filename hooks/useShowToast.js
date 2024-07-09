import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useShowToast = () => {
    const showToast = ({ status, title, description }) => {
    const options = {
        type: status,
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    // テンプレリテラル、メッセージ改行、
    const message = `${title || 'Notification'}${description || ''}`;
    toast(message, options);
    // toast(title || 'Notification', options);
    // if (description) {
    //     toast(description, {
    //     type: 'info',
    //     position: 'top-center',
    //     autoClose: 2000,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     });
    //   }
    };
  
    return showToast;
};