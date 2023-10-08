import Message  from '../models/Message';

export const handleMessage = async (message: string, userId: string) => {
  const newMessage = new Message({ content: message, userId });
  await newMessage.save();
  // その他のロジック（NLP、応答生成など）
};
