const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json()); 

  server.post('/bfhl', (req, res) => {
    const { data } = req.body;
    
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    
    res.json({
      is_success: true,
      user_id: "Paarth Panthri",
      email: "paarth.paan3@gmail.com",
      roll_number: "21BCE3560",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase
    });
  });

  server.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
