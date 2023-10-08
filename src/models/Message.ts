import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  // その他のフィールド
});

export default mongoose.model('Message', MessageSchema);
