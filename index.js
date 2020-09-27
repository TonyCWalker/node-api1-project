const express = require('express');
const server = express();
const shortid = require('shortid');

server.use(express.json());

let users = [];

// Create (POST)
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = shortid.generate();

    try{
        if(newUser.name && newUser.bio ){
            users.push(newUser)
            res.status(201).json(users)    
        } else{
            res.status(400).json({ message:"Please provide name and bio for the user." });
        }

    } catch (err) {
        res.status(500).json({ message:"There was an error while saving the user to the database" });
    }
});

// Read (GET)
server.get('/api/users', (req, res) => {
    try{
        res.status(200).json(users)
    }catch(err) {
        res.status(500).json({ message:"The users information could not be retrieved." });
    }
});

// GET ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    try{
        let userFound = users.find( user => user.id === id)

        if(userFound) {
            res.status(200).json(userFound)
        }
        else{
            res.status(404).json({ message:"The user with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({ message:"The user information could not be retrieved." });
    }
});

// DELETE
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const deleted = users.find(user => user.id === id);

    try{
        if(deleted) {
            users = users.filter(user => user.id !== id)
            res.status(200).json(deleted)
        }
        else{
            res.status(404).json({message:"The user with the specified ID does not exist."})
        }
    }catch(err) {
        res.status(500).json({message:"The user could not be removed"});
    }
});

// UPDATE
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    try{
        let index = users.findIndex( user => user.id === id)

        if(index !== -1) {
            if(changes.name && changes.bio ){
                users[index] = changes;
                res.status(200).json(users[index])
            } else{
                res.status(400).json({ message:"Please provide name and bio for the user." });
            }
        }
        else{
            res.status(404).json({ message:"The user with the specified ID does not exist." })
        }
    }catch(err) {
        res.status(500).json({ message:"The user information could not be modified." });
    }
});

const port = 5000; 
server.listen(port, () => {
  console.log(`Server running on port:${port}`);
});