const User = require('../../../Models/user')
const express = require('express')
const login = express.Router();
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'eiuehnx!@#nekjnkndkjdejhkwenbceuuyuewyuqwed';


login.post('/', async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email, !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        } else {
            let userEmail = await User.findOne({ email });
            if (!userEmail) {
                return res.status(400).json({ message: 'User not found' });
            } else {
                let user = await User.findOne({ email, password })
                if (!user) {
                    return res.status(400).json({ message: 'password is incorrect' });
                } else {
                    let token = JWT.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        gender: user.gender,
                        url: user.url
                    }, JWT_SECRET);
                    return res.json({
                        user: { name: user.name, gender: user.gender, email: user.email, _id: user._id, phone: user.phone, address: user.address, img_url:user.img_url},
                        message: 'Login Successfully',
                        token: token
                    });
                }
            }

        }

    } catch (error) {
        return res.status(500).json({ message: 'internal server error', error })
    }
})


module.exports = login;