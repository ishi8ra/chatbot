import { Request, Response } from 'express';
import User from '../models/User'; // Userモデルをインポート

// ユーザー登録
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

// ログイン
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

// ユーザー情報取得
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
};
