import { useState, useEffect } from 'react';
import { useShowToast } from '../../../../hooks/useShowToast';
import { useRouter } from 'next/router';

import '../../api/auth/firebaseConfig';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import styles from '../../../styles/Login.module.css';
import Description from '../../../components/description';
import { destroyCookie, setCookie } from 'nookies';
import { parseCookies } from 'nookies';

const Home = () => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const router = useRouter();
    const auth = getAuth()

    useEffect(() => {
        const Logout = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => Logout();
    }, [auth]);

    const handleLogout = async() => {
        try {
            console.log('----どこでトークン削除が行われるか----',document.cookie)
            await signOut(auth);
            console.log('----ログアウト0----',auth)
            destroyCookie(null, 'token', { path: '/Research/MyPage'});
            console.log('----トークン削除されてるはず----',document.cookie)
            setUser(null);
            showToast({
                status: 'success',
                title: 'ログアウトしました。'
            })
            router.push('/Research/FirebaseLogin');
        } catch (error) {
            showToast({
                status: 'error',
                title: 'ログアウトに失敗しました。',
            })
        }

    }
    return (
        <div className={ styles.background_home }>
            <div style={{ background: 'white', position: 'absolute', top: 20, width: '60%', textAlign: 'center'}}>
                <p style={{ fontSize: '60px', fontWeight: 'bold', color: '#ea9917', width: 'top'}}>
                    AIと一緒に自由研究テーマを決めよう!
                </p>
            </div>
            <Description />
            <button
            onClick={handleLogout}
            className={styles.button_LogOut}>ログアウト
            </button>
        </div>
    );
};

// export async function getServerSideProps(context) {
//     const cookies = parseCookies(context);

//     if (!cookies.token) {
//         return {
//             redirect: {
//                 destination: '/Research/FirebaseLogin',
//                 permanent: false
//             },
//         };
//     }

//     return {
//         props: {},
//     };
// }

// const Dashboard = ({ user }) => {
//     return (
//       <div>
//         <h1>Dashboard</h1>
//         <p>Welcome, {user.email}</p>
//       </div>
//     );
//   };
// export default Dashboard;

export default Home;