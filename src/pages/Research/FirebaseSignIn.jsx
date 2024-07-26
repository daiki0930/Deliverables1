import { useState } from 'react';
import { useRouter } from 'next/router';
import '../api/firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/Login.module.css';
import { useShowToast } from '../../../hooks/useShowToast';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const auth = getAuth();
    const showToast = useShowToast();

    
    // authはfirebaseAuthenticationサービスのインスタンス
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const registerUser = await createUserWithEmailAndPassword(auth, email, password);
            setUser(registerUser);
            showToast({
                status: 'success',
                title: 'ユーザー登録が完了しました。',
            });
            router.push('/Research/FirebaseLogin');
        } catch (error) {
            setError(error);
            showToast({
                status: 'error',
                title: '既にユーザー登録をしています。',
            });
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
                    className={styles.button_LogSign}
                    >
                        新規登録
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
//                 destination: '/Research',
//                 permanent: false
//             },
//         };
//     }

//     return {
//         props: { user },
//     };
// }

export default SignInForm;