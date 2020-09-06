const express = require('express');
const server = express();
const shortid = require('shortid');

let users = [];

server.use(express.json());

// Create (POST)
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    // if (valid(body)) {

    // } else {
    //     res.status(400).json({messsage:"bad input data"});
    // }
    
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
});

// Read (GET)
server.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

// GET ID
// server.get('/api/users/:id', (req, res) => {
//     const { id } = req.params;

//     const user = users.find(user => user.id === id);

//     if (user) {
//         res.status(200).json(user);
//     } else {
//         res.status(404).json({message: "id not found"});
//     }
// });

// DELETE
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const deleted = users.find(user => user.id === id);

    if (deleted) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: "id not found"});
    }
});

// UPDATE
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    let index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users[index] = changes;
        res.status(200).json(users[index]);
    }   else {
        res.status(404).json({message: "id not found"});
    }
});

const port = 5000; 
server.listen(port, () => {
  console.log(`Server running on port:${port}`);
});