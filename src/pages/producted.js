import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // 環境変数に保存するのがベスト

export default function Protected() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      setUser(decoded);
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
}