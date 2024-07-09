import { useState } from 'react';
import { useRouter } from 'next/router';
import '../api/auth/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/Login.module.css';
import { useShowToast } from '../../../hooks/useShowToast';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const auth = getAuth();
    const showToast = useShowToast()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginUser = await signInWithEmailAndPassword(auth, email, password);
            showToast({
                status: 'success',
                title: 'ログインに成功しました。'
            })
            setUser(loginUser);
            router.push('/Photos/FirebaseSignIn');
        } catch (error) {
            setError(error);
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
                        className={styles.button2}
                        >
                            ログイン
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;