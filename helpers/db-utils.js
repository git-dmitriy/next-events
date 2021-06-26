import { MongoClient } from 'mongodb';
require('dotenv').config();

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  const client = await MongoClient.connect(uri);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort = { _id: -1 }) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
