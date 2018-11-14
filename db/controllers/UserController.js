const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/', ((req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send('There was a problem finding the users');
        res.status(200).send(users);
    });
}));

router.get('/:id', ((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send('There was a problem finding user');
        res.status(200).send(user)
    });
}));

router.post('/create', ((req, res) => {
    const payload = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    };

    User.create(payload, (err, user) => {
        if (err) res.status(500).send('Problem in user creating');
        res.status(200).send(user)
    });
}));

module.exports = router;
