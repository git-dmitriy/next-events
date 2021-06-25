function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Email is invalid' });
      return;
    }
    console.log(userEmail);
    res.status(201).json({ mesage: 'Signed up!' });
  }
}

export default handler;
