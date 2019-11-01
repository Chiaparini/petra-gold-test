const express = require('express');
const router = express.Router();
const Weapon = require('../models/weapon');

router.get('/', async (req, res) => {
    try {
        const weapons = await Weapon.find();
        res.send(weapons);
    }  catch (err) {
        return res.status(400).send({ error: 'Error while listing weapons.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const weapon = await Weapon.create(req.body);
        res.send({ weapon });
    } catch (err) {
        console.log(req.body);
        console.log(err);
        return res.status(400).send({ error: 'Error while creating new weapon.' });
    }
});
  
module.exports = router;
