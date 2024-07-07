// import { getUsers, saveUsers } from './auth/fileHandler';


// // 新規ユーザーを確認、Jsonに保存
// export default function handler(req, res) {
//     const { email, password } = req.body;

//     const users = getUsers();
//     const existingUser = users.find(user => user.email === email);

//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exist' });
//     }

//     users.push({ email, password });
//     saveUsers(users);

//     return res.status(201).json({ message: 'User registered successfully' });
// }