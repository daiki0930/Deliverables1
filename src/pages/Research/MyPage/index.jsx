import { useState, useEffect } from 'react';
import { useShowToast } from '../../../../hooks/useShowToast';
import { useRouter } from 'next/router';

import '../../api/firebase/firebaseConfig';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import styles from '../../../styles/Login.module.css';
import Description from '../../../components/description';

import { destroyCookie, setCookie } from 'nookies';
import { parseCookies } from 'nookies';
import { auth } from '../../api/firebase/firebaseAdmin';

// export async function getServerSideProps(context) {
//     const cookies = parseCookies(context);

//     if (!cookies.session) {
//         return {
//             redirect: {
//                 destination: '/Research/FirebaseLogin',
//                 permanent: false
//             },
//         };
//     }

//     try {
//         const decodedToken = await admin.auth().verifySessionCookie(cookies.session, true);
//         return {
//             props: { user: decodedToken },
//           };
//     } catch (error) {
//           return {
//             redirect: {
//               destination: '/Research/FirebaseLogin',
//               permanent: false,
//             },
//         };
//     }
// }

const Home = () => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const router = useRouter();
    const auth = getAuth()
    const [interests, setInterests] = useState();

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
            // destroyCookie(null, 'token', { path: '/Research/MyPage'});
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
            <div style ={{position: 'absolute', top: 20, width: '60%', textAlign: 'center', background: 'white'}}>
                <p style={{ fontSize: '60px', fontWeight: 'bold', color: '#ea9917'}}>
                    AIと一緒に自由研究テーマを決めよう!
                </p>
            </div>
            {/* <Description /> */}
            <button
            onClick={handleLogout}
            className={styles.button_LogOut}>ログアウト
            </button>



            <p style ={{ position: 'absolute', bottom: '200px', }}>
                いくつかの質問に答えてみよう！
            </p>
        <label>
          興味のある分野:
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="例: 科学, 歴史, 自然, アート"
          />
        </label>
        </div>
    )
};

export default Home;