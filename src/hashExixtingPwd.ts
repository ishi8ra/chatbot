import mongoose = require("mongoose");
import bcrypt = require("bcrypt");
import User from './models/User'; // このパスは、あなたのプロジェクトに合わせて調整してください。

async function hashPasswords() {
  // MongoDBに接続
  await mongoose.connect("mongodb://root:password@localhost:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  // すべてのユーザーを取得
  const users = await User.find({});

  // 各ユーザーのパスワードをハッシュ化
  for (let user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await user.save(); // ハッシュ化したパスワードでユーザー情報を更新
  }

  // MongoDBの接続を閉じる
  await mongoose.disconnect();
}

// 関数を実行
hashPasswords().catch((err) => {
  console.error("An error occurred:", err);
});
