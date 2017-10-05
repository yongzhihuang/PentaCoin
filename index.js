const compression = require('compression');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const blockChain = require('./blockchain');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/mine', function (req, res) {
    res.send('mining a new block');
});

app.post('/transactions/new', function (req, res) {
    res.send('Adding new transaction');
});

app.get('/chain', function (req, res) {
    const response = {
        chain: blockChain.chain,
        length: blockChain.chain.length
    };
    res.json(response);
});

const server = http.createServer(app);
server.listen(PORT);

console.log(`Server started, listening at: http://localhost:${PORT}...`);