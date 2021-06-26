require('dotenv').config();
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Email is invalid' });
      return;
    }

    const client = await MongoClient.connect(uri);
    const db = client.db();
    await db.collection('newsletter').insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ mesage: 'Signed up!' });
  }
}

export default handler;
