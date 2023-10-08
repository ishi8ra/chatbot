import { Server } from 'socket.io';
import { handleMessage } from '../controllers/chatController';

const io = new Server(3000);

io.on('connection', (socket) => {
  socket.on('message', (message, userId) => {
    handleMessage(message, userId);
  });
});
