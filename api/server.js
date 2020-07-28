const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const postsRouter = require('../posts/posts-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/posts', authenticate, postsRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Up and running!"})
})

module.exports = server;