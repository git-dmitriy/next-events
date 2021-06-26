import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-utils';
const uri = process.env.MONGODB_URI;

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connect to database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input!' });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Insert comment to database failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments');
      console.log(documents);
      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: 'Get comments faild!' });
    }
  }
  client.close();
}

export default handler;
