import admin from './firebase/firebaseAdmin';
import { setCookie } from 'nookies';

export default async (rep, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    const { token } = req.body;

    try {
        const expiresIn = 60 * 60 * 1000;
        const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });
        setCookie({ req }, 'session', sessionCookie, {
            maxAge: expireIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV = 'production',
            path: '/'
        });

        res.status(200).end();
    } catch (error) {
        res.status(500).send('セッションクッキーの設定に失敗しました。');
    }
};