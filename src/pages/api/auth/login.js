import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { verify } from 'crypto';

const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: '$2a$10$E6Q8xQ5bJcH/4DPQJaiJpOtKuZ5j1YVoF8Ppvgm8lDfuq8RFLWyyW', // hashed password 'password123'
  }
];

// hash化コード
const hashPassword = async (uniquePassword) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(uniquePassword, saltRounds);
        console.log('hash')
    } catch (err) {
        console.log('ハッシュ化エラー',err);
    }
};

const verifyPassword = async (uniquePassword, hash) => {
    try {
        const result = await bcrypt.compare(uniquePassword, hash);
        console.log('パスワードが一致するか', result);
        return result;
    } catch (err) {
        console.log('検証エラー', err);
    }
};

(async () => {
    const uniquePassword = 'password1234';
    const hash = await hashPassword(uniquePassword);
    const isMatch = await verifyPassword(uniquePassword, hash);
    console.log('検証結果', isMatch)
})























export default (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ token });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};