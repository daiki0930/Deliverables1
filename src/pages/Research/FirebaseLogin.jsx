import { Box, Text, Button, Heading, Spacer, InputGroup, InputLeftElement, Icon, Input } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
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
    // const oneHourInSeconds = 3600;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginUser = await signInWithEmailAndPassword(auth, email, password);
            setUser(loginUser.user);
            const token = await loginUser.user.getIdToken();
            // await fetch('api/auth/sessionLogin', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ token })
            // });
            // await auth.signOut();
            // setCookie(null, 'token', token, { maxAge: oneHourInSeconds, path: '/Research/MyPage'});

            showToast({
                status: 'success',
                title: 'ログインに成功しました。'
            })
            router.push('/Research/MyPage/');
        } catch (error) {
            if (!email || password) throw new Error('認証情報を入力してください。');
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
        <Box className={styles.container}>
            <Box className={styles.card}>
                <Heading>ログイン</Heading>
                    <Input
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <Input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <Button onClick={handleLogin} type="submit" className={styles.button_LogSign}>
                        ログイン
                    </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;