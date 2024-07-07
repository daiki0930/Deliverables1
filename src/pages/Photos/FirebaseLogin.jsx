import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/Login.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const auth = getAuth();

    const handleLogin = async (e) => {
        event.preventDefault();
        try {
            const loginUser = await signInWithEmailAndPassword(auth, email, password);
            setUser(loginUser)
            router.push('/Photos/MyPage')
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>ログイン</h2>
                <form onSubmit={handleLogin}>
                    <div>
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
                    </div>
                    <div>
                        <button
                        type="submit"
                        className={styles.button2}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;