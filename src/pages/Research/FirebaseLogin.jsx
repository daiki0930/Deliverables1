import { useState } from 'react';
import { useRouter } from 'next/router';

import '../api/firebase/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import styles from '../../styles/Login.module.css';
import { useShowToast } from '../../../hooks/useShowToast';

import { setCookie } from 'nookies';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const auth = getAuth();
    const showToast = useShowToast()
    const oneHourInSeconds = 3600;

    // console.log('----ログイン0------',document.cookie)

    const handleLogin = async (e) => {
        console.log('----ログイン0------', )
        e.preventDefault();
        try {
            const loginUser = await signInWithEmailAndPassword(auth, email, password);
            setUser(loginUser.user);
            console.log('----ログイン1-------')
            const token = await loginUser.user.getIdToken();
            const csrfToken = 'dummy_csrf_Token';
            await fetch('api/auth/sessionLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, csrfToken })
            });
            await auth.signOut();
            // setCookie(null, 'token', token, { maxAge: oneHourInSeconds, path: '/Research/MyPage'});

            showToast({
                status: 'success',
                title: 'ログインに成功しました。'
            })
            router.push('/Research/MyPage/');
        } catch (error) {
            setError(error);
            setUser(null);
            showToast({
                status: 'error',
                title: 'ログインに失敗しました。',
                description: '入力されたユーザー情報が正しくありません。'
            })
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h2>ログイン</h2>
                <div>
                    <form onSubmit={handleLogin}>
                        <input
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                        />
                        <input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                        />
                        <button
                        type="submit"
                        className={styles.button_LogSign}
                        >
                            ログイン
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// export async function getServerSideProps(context) {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) {
//         return {
//             redirect: {
//                 destination: '/pages',
//                 permanent: false
//             },
//         };
//     }

//     return {
//         props: { user },
//     };
// }

export default LoginForm;