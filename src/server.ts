import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDB, insertData, fetchData, updateData, deleteData, closeDBConnection } from './db';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
    await connectToDB();
    res.send('Connected to MongoDB');
});

// 新規データの追加
app.post('/add', async (req: Request, res: Response) => {
    const data = req.body; // Assuming data is in JSON format in the request body
    await insertData([data]);
    res.send('Data added');
});

// データの取得
app.get('/data', async (req: Request, res: Response) => {
    const data = await fetchData();
    res.json(data);
});

// データの更新
app.put('/update/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const newData = req.body;
    await updateData(id, newData);
    res.send('Data updated');
});

// データの削除
app.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    await deleteData(id);
    res.send('Data deleted');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Close the database connection when the Node process is terminated
process.on('exit', async () => {
    await closeDBConnection();
});
