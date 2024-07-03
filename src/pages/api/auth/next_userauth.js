import NextAuth from 'next-auth';
import Provider from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.GOOGLE_SECRET,
        }),
    ],
});