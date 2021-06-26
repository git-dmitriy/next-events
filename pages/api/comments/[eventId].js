require('dotenv').config();
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(uri);

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);

    console.log('Posted data:', result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Added comment', comment: newComment });
  }

  if (req.method === 'GET') {
    const db = client.db();
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
