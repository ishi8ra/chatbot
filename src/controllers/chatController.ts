import { Request, Response } from 'express';
import Message  from '../models/Message';
import User from '../models/User';

export const receiveMessage = async (req: Request, res: Response) => {
  const { userId, content } = req.body;

  // メッセージをデータベースに保存
  const message = new Message({
    userId,
    content,
    // その他のフィールド
  });
  await message.save();

  // 応答を生成（この部分でNLPや他のロジックを適用）
  const response = generateResponse(content);

  // 応答をデータベースにも保存
  const botMessage = new Message({
    userId: 'botId', // ボットのID
    content: response,
    // その他のフィールド
  });
  await botMessage.save();

  // 応答をクライアントに送信
  res.json({ message: response });
}

const generateResponse = (userInput: String) => {
  // NLPやその他のロジックを用いて応答を生成
  // 例
  if (userInput.includes('こんにちは')) return 'こんにちは！';

  return '何かお手伝いできることはありますか？'; // デフォルトの応答
};

export const getMessageHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;

  // ユーザーIDに基づいてメッセージ履歴を取得
  const messages = await Message.find({ userId }).sort({ createdAt: -1 });

  res.json({ messages });
};

export const handleMessage = async (message: string, userId: string) => {
  const newMessage = new Message({ content: message, userId });
  await newMessage.save();
  // その他のロジック（NLP、応答生成など）
};