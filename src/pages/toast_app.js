import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Components, pageProps }) {
    return (
        <>
        <Component {...pageProps} />
        <ToastContainer />
        </>
    );
}

export default MyApp;