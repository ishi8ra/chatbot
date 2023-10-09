import { Request, Response } from 'express';
import User from '../models/User'; // Userモデルをインポート

// ユーザー登録
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log(`New user registered: ${username}, ${email}`); // サーバーログに出力
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('Error during user registration:', error); // エラーログ
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// ログイン
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // ここで認証処理（省略）

  console.log(`User logged in: ${username}`); // サーバーログに出力
  res.json({ message: 'Logged in' });
};

export const logout = (req: Request, res: Response) => {
  // セッションまたはトークンの削除（実装による）

  console.log('User logged out'); // サーバーログに出力
  res.json({ message: 'Logged out' });
};

// ユーザー情報取得
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      console.log(`User not found: ${id}`); // サーバーログに出力
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(`Fetched user: ${user.username}`); // サーバーログに出力
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error); // エラーログ
    res.status(400).json({ message: 'Error fetching user', error });
  }
};
