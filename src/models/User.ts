import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  age: { type: Number },
  gender: { type: String },
  // 他のフィールド
});

enum UserRole {
  User = 'user',
  Admin = 'admin',
}


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  createdAt: { type: Date, default: Date.now },
  profile: { type: ProfileSchema },
  lastActiveAt: { type: Date, default: Date.now },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.User },
});

export default mongoose.model('User', UserSchema);
