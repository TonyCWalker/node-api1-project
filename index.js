const express = require('express');
const port = 5000; 

const server = express();

server.get('/', (req, res) => {
    res.send('Hello world from Express!');
});

server.listen(port, () => {
  console.log(`Server running on ${port}/`);
});