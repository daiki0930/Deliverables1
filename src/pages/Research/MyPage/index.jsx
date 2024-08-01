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
            <div style ={{ position: 'absolute', top: 20, width: '75%', textAlign: 'center', backgroundColor: '#ffffff'}}>
                <p style={{ fontSize: '60px', fontWeight: 'bold', color: '#ea9917' }}>
                    AIと一緒に自由研究テーマを決めよう!
                </p>
            </div>
            {/* <Description /> */}
            <button
            onClick={handleLogout}
            className={styles.button_LogOut}>ログアウト
            </button>
            <div style={{ position: 'absolute', bottom: '200px', width: '100%', textAlign: 'center', backgroundColor: '#f3960b'}}>
            <p style ={{ fontSize: '30px', color: 'black'}}>
                いくつかの質問に答えてね！
            </p>
            </div>
            <label>
                学校で好きな科目は？:
                <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                // className={styles.question_input}
                />
            </label>
            <label style={{ fontSize: '20px'}}>
                理科の授業で面白かった実験は？
                <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="例: 水の性質、燃焼、光の反射と屈折、バネと力、昆虫の観察、天気の観察"
                className={styles.question_input}
                />
            </label>
            <label>
                どのくらいの期間で終わらせたい？:
                <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="例: 科学, 歴史, 自然, アート"
                />
            </label>
            <label>
                家にあるもので何か使ってみたいものはある？:
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