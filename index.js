const express = require('express');
const server = express();
const shortid = require('shortid');
server.use(express.json());

// Create (POST)
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (valid(userInfo)) {
        res.status(200).json(userInfo);
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    }
    
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
});

// Read (GET)
server.get('/api/users', (req, res) => {
    const users = [
        {
            id: "a_unique_id", 
            name: "Jane Doe", 
            bio: "Not Tarzan's Wife, another Jane",
          }
    ];

    res.status(200).json(users);
});

// GET ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const userFound = users.find(user => user.id === id);

    if (userFound) {
        res.status(200).json(userFound);
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }
});

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