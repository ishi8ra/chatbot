// import { Server } from 'socket.io';
// import { handleMessage } from '../controllers/chatController';

// const io = new Server(3000);

// io.on('connection', (socket) => {
//   socket.on('message', (message, userId) => {
//     handleMessage(message, userId);
//   });
// });

// ↓ ChatGPTの新提案. 一旦こっちで進める。
import { Server } from 'socket.io';

const io = new Server(3001); // 3001ポートでWebSocketサーバーを起動

io.on('connection', (socket) => {
  console.log('新しいクライアントが接続しました');

  // クライアントからのメッセージを受信
  socket.on('message', (message) => {
    console.log(`クライアントからのメッセージ: ${message}`);

    // すべてのクライアントにメッセージをブロードキャスト
    io.emit('message', message);
  });

  // クライアントの切断を検知
  socket.on('disconnect', () => {
    console.log('クライアントが切断しました');
  });
});
