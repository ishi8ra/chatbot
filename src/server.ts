import path from 'path';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDB, insertData, fetchData, updateData, deleteData, closeDBConnection } from './db';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes';
// import { MongoClient } from 'mongodb';

mongoose.connect('mongodb://root:password@localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true } as any)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

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

app.use(bodyParser.json());
app.use(express.json());
app.use('/api/users', userRoutes);


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://root:password@localhost:27017/admin";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err: Error | null ) => {
    // creating collection
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

app.use(express.static(path.join(__dirname, 'views')));

// GETリクエストでregisterページを表示
app.get('/register', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});
// GETリクエストでloginページを表示
app.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
// GETリクエストでhomeページを表示
app.get('/home', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
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
  console.log(`Server is running on port ${PORT}`);
});

process.on('exit', async () => {
  await closeDBConnection();
});
