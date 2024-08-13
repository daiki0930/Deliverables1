// import admin from 'firebase-admin';
// // import serviceAccount from './serviceAccount.json';


// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert({
//             projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
//             privateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
//             clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
//         }),
//     });
// }

// export const auth = admin.auth()