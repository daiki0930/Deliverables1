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

    // テンプレリテラル、メッセージ改行、||は論理演算子、どちらかあれば真を返す
    // titleがあればそのまま表示、descriptionがあればそのまま表示
    // const message = `${title || 'Notification'}\n${description || ''}`;
    // toast(message, options);
    toast(title || 'Notification', options);
    if (description) {
        toast(description, {
        type: 'info',
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
      }
    };
  
    return showToast;
};