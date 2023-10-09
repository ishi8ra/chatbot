import { Request, Response } from 'express';
import User from '../models/User'; // Userモデルをインポート
import bcrypt from 'bcrypt';

// ユーザー登録
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
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

  try {
    // ユーザー名でユーザーを検索
    const user = await User.findOne({ username });

    // ユーザーが存在しない場合
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // パスワードの比較
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password);
    console.log(user.password);

    // パスワードが一致しない場合
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }

    console.log(`User logged in: ${username}`); // サーバーログに出力
    res.json({ message: 'Logged in' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
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
