const express = require('express');
const router = express.Router();
const CONFIG = require('../config');
const User = require('../models/User');
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', ((req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send('There was a problem finding the users');
        res.status(200).send(users);
    });
}));

router.get('/me', ((req, res) => {
    const token = req.headers['authorization'];
    if (!token) res.status(401).send({ auth: false, message: 'Access denied' });
    jwt.verify(token, CONFIG.JWT.SECRET, ((err, decoded) => {
        if (err) res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        User.findById(decoded.id, { password: 0}, (err, user) => {
            if (err) return res.status(500).send(err);
            if (!user) return res.status(404).send('User not found');
            res.status(200).send(user);
        });
    }));
}));

router.get('/:id', ((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send('There was a problem finding user');
        res.status(200).send(user)
    });
}));

router.post('/login', ((req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        const validPassword = crypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send('Bad password');
        const token = jwt.sign({ id: user._id }, CONFIG.JWT.SECRET, { expiresIn: CONFIG.JWT.EXPIRE });
        res.status(200).send({ auth: true, token })
    });
}));

router.post('/create', ((req, res) => {
    const payload = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: crypt.hash(req.body.password, 8)
    };
    User.create(payload, async (err, user) => {
        if (err) return res.status(500).send(`Problem in user creating - ${err}`);
        const token = await jwt.sign({ id: user._id }, CONFIG.JWT.SECRET, { expiresIn: CONFIG.JWT.EXPIRE });
        res.status(200).send({ user, token });
    });
}));

module.exports = router;
