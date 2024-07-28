// import auth from '../firebase/firebaseAdmin';
// import { setCookie } from 'nookies';

// export default async (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).end();
//     }
//     const { token } = req.body;

//     try {
//         const expiresIn = 60 * 60 * 1000;
//         const sessionCookie = await auth().createSessionCookie(token, { expiresIn });
//         setCookie({ req }, 'session', sessionCookie, {
//             maxAge: expiresIn / 1000,
//             httpOnly: true,
//             path: '/'
//         });

//         res.status(200).end();
//     } catch (error) {
//         res.status(500).send('セッションクッキーの設定に失敗しました。');
//     }
// };