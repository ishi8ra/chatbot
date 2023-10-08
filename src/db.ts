import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb://root:password@localhost:27017";
const client = new MongoClient(uri);

export async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

export async function insertData(data: any) {
    try {
        const database = client.db("demo_db");
        const collection = database.collection("demo_collection");
        const result = await collection.insertMany(data);
        console.log(`Inserted documents: ${result.insertedCount}`);
    } catch (err) {
        console.error(err);
    }
}

export async function fetchData() {
    try {
        const database = client.db("demo_db");
        const collection = database.collection("demo_collection");
        const data = await collection.find({}).toArray();
        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function updateData(id: string, newData: any) {
    try {
        const database = client.db("demo_db");
        const collection = database.collection("demo_collection");
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: newData });
        console.log(`Updated documents: ${result.modifiedCount}`);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteData(id: string) {
    try {
        const database = client.db("demo_db");
        const collection = database.collection("demo_collection");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        console.log(`Deleted documents: ${result.deletedCount}`);
    } catch (err) {
        console.error(err);
    }
}

export async function closeDBConnection() {
    await client.close();
}
