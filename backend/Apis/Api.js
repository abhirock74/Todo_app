const express = require('express')
const app = express.Router();
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'eiuehnx!@#nekjnkndkjdejhkwenbceuuyuewyuqwed';

app.use('/auth', require('./Auth/Auth'))

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        const decoded = JWT.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token is invalid' });
    }
};

app.use(verifyToken);
app.use('/notes', require('./notes/notesRoute'))



module.exports = app;