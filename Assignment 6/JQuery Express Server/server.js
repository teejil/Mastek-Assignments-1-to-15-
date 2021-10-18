const { response } = require('express');
const express = require('express');
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const port = 4000;
server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
server.get('/js/main.js', (req, res) => {
    res.sendFile(__dirname + '/js/main.js');
});

server.post('/welcome', (req, res) => {
    res.send("Welcome");
});
server.listen(port, () => {
    console.log(`http://localhost:${port} started`);
})