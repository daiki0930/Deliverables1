import { useState, useEffect } from 'react';
import { useShowToast } from '../../../../hooks/useShowToast';
import { useRouter } from 'next/router';

import '../../api/firebase/firebaseConfig';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import styles from '../../../styles/Login.module.css';
import React from 'react';
// import Description from '../../../components/description';

// import { destroyCookie, setCookie } from 'nookies';
// import { parseCookies } from 'nookies';
// import { auth } from '../../api/firebase/firebaseAdmin';

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
    const [interests1, setInterests1] = useState();
    const [interests2, setInterests2] = useState();
    const [interests3, setInterests3] = useState();
    const [theme, setTheme] = useState();
    const [content, setContent] = useState();

    const fetchTheme = async () => {
        const response = await fetch('../../api/generate-theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ interests, interests1, interests2, interests3 }),
        });
        const data = await response.json();
        setTheme(data.theme);
        setContent(data.content);
    };


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
            <div style ={{ position: 'absolute', top: 20, width: '75%', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '10px'}}>
                <p style={{ fontSize: '60px', fontWeight: 'bold', color: '#ea9917' }}>
                    AIと一緒に自由研究テーマを決めよう!
                </p>
            </div>
            {/* <Description /> */}
            <button
            onClick={handleLogout}
            className={styles.button_LogOut}>ログアウト
            </button>
            <div style={{ position: 'absolute', bottom: '100px', width: '100%', textAlign: 'center', backgroundColor: '#f3960b'}}>
                <p style ={{ fontSize: '30px', color: 'black'}}>
                    いくつかの質問に答えてね！
                </p>
            </div>

            <div style ={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '25px', height: '100vh'}}>
                <label style ={{ marginTop: '500px'}}>
                    小学校の授業で好きな科目は？(１科目だけ教えてね)
                </label>
                <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="例: 理科、社会"
                className={styles.question_input1}
                />
                <label>
                    理科の授業で面白かった実験は？(理科と答えた場合のみ)
                </label>
                <input
                type="text"
                value={interests1}
                onChange={(e) => setInterests1(e.target.value)}
                placeholder="例: 水の性質、燃焼、光の反射と屈折、バネと力、昆虫の観察、天気の観察"
                className={styles.question_input2}
                />
                <label>
                    好きな科目のことで、どんなことが気になる？(理科以外で答えた場合のみ)
                </label>
                <input
                type="text"
                value={interests1}
                onChange={(e) => setInterests1(e.target.value)}
                placeholder="例: 漢字や詩に関すること(国語)、図形やデータのこと(算数)、地理や歴史のこと(社会)"
                className={styles.question_input3}
                />
                <label>
                    どのくらいの期間で終わらせたい？
                </label>
                <input
                type="text"
                value={interests2}
                onChange={(e) => setInterests2(e.target.value)}
                placeholder="例: 一週間、一ヶ月"
                className={styles.question_input4}
                />
                <label>
                    家にあるもので何か使ってみたいものはある？
                </label>
                <input
                type="text"
                value={interests3}
                onChange={(e) => setInterests3(e.target.value)}
                placeholder="例: 水、酢、砂糖、電池、ペットボトル、磁石、アルミホイル、空き瓶"
                className={styles.question_input5}
                />

                <button
                onClick={fetchTheme}
                className={styles.button_Create}>
                    この条件で案を作成してもらう
                </button>

                <label style ={{ marginTop: '60px'}}>
                提案テーマ
                </label>
                
                { theme && <p className={styles.responseText}> {theme} </p> }
                
                { content && <p className={styles.responseText}> {content} </p> }
                
            </div>

        </div>
    )
};

export default Home;