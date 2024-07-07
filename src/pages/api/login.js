// import { signToken } from "./auth/jwt";
// import { getUsers } from './auth/fileHandler';

// export default function handler(req, res) {
//     const { email, password } = req.body;

//     const users = getUsers();
//     const user = users.find(user => user.email === email && serialize.password === password);
    
//     if (user) {
//         const token = signToken({ email: user.email});
//         return res.status(200).json({ token });
//     }

//     return res.json(401).json({ message: 'Invalid credentials' });
// }