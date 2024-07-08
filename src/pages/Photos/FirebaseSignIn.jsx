import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/Login.module.css';
import { toast } from 'react-toastify';
// import { useShowToast } from '@/hooks/useShowToast';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const auth = getAuth();
    // const showToast = useShowToast();

    
    // authはfirebaseAuthenticationサービスのインスタンス
    const handleRegister = async (e) => {
        console.log('----1----')
        e.preventDefault();
        console.log('----2----')
        try {
            console.log('----3----')
            const registerUser = await createUserWithEmailAndPassword(auth, email, password);
            toast.success('ユーザー登録完了!');
            console.log('----4---', registerUser.user)
            setUser(registerUser);
            console.log('----5---', registerUser.user)
            console.log('----6---', registerUser)
            router.push('/Photos/FirebaseLogin');
            console.log('----できてはいる----')
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h2>新規登録</h2>
                <div>
                    <form onSubmit={handleRegister}>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                    className={styles.input}
                    />
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    className={styles.input}
                    />
                    <button 
                    type="submit" 
                    className={styles.button2}
                    >
                        新規登録
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;