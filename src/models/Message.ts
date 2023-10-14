import mongoose from 'mongoose';

enum MessageType {
  Text = 'text',
  Image = 'image',
  Button = 'button'
}
enum MessageStatus {
  Sent = 'sent',
  Delivered = 'delivered',
  Read = 'read',
  Failed = 'failed',
}

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, enum: Object.values(MessageType), default: MessageType.Text },
  status: { type: String, enum: Object.values(MessageStatus), default: MessageStatus.Sent },
  metadata: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.model('Message', MessageSchema);
