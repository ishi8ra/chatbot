import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDB, insertData, fetchData, updateData, deleteData, closeDBConnection } from './db';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes';

// handleMessage関数の定義
async function handleMessage(message: string, userId: string) {
  console.log(`Processing message: ${message} from user: ${userId}`);
  // ここでメッセージとユーザーIDを用いた処理を行う
  // 例: データベースにメッセージを保存
  // その他の処理...
}

const app = express();
const io = new Server(3001); // WebSocketサーバーは3001ポートで起動
const PORT = process.env.PORT || 3000; // HTTPサーバーは3000ポートで起動

// 既存のミドルウェア
app.use(bodyParser.json());

// 新たに追加するミドルウェア
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true } as any);

app.get('/', async (req: Request, res: Response) => {
  res.send('Connected to MongoDB');
});

app.post('/add', async (req: Request, res: Response) => {
  const data = req.body;
  await insertData([data]);
  res.send('Data added');
});

app.get('/data', async (req: Request, res: Response) => {
  const data = await fetchData();
  res.json(data);
});

app.put('/update/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const newData = req.body;
  await updateData(id, newData);
  res.send('Data updated');
});

app.delete('/delete/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteData(id);
  res.send('Data deleted');
});

app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', async (message, userId) => {
    console.log(`Received message ${message} from user ${userId}`);

    try {
      await handleMessage(message, userId);
      socket.emit('message', 'Message processed');
    } catch (error) {
      console.error(`Error while handling message: ${error}`);
      socket.emit('message', 'Error while processing message');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});

process.on('exit', async () => {
  await closeDBConnection();
});
