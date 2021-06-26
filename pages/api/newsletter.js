import { connectDatabase, insertDocument } from '../../helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Email is invalid' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: 'Connect to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
    } catch (err) {
      res.status(500).json({ message: 'Insert email to database failed!' });
      client.close();
      return;
    }

    client.close();
    res.status(201).json({ mesage: 'Signed up!' });
  }
}

export default handler;
