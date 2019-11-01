const express = require('express');
const router = express.Router();
const Knight = require('../models/knight');
const Weapon = require('../models/weapon');
const Heroes = require('../models/heroes');

router.get('/', async (req, res) => {
    try {
        let entities;

        if (req.query.filter === 'heroes') {
            entities = await Heroes.find().populate('weapons');
        } else {
            entities = await Knight.find().populate('weapons');
        }

        res.send([ ...entities ]);
    } catch {
        return res.status(400).send({ error: 'Error while listing the knights.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, nickname, birthday, attributes, weapons, keyAttribute } = req.body;

        const knight = await Knight.create({ name, nickname, birthday, attributes, keyAttribute });

        await Promise.all(weapons.map(async weapon => {
            const knightWeapon = new Weapon({ ...weapon, knight_id: knight._id });

            await knightWeapon.save();

            knight.weapons.push(knightWeapon);
        }))

        await knight.save();

        res.send({ knight });
    } catch (err) {
        return res.status(400).send({ error: 'Error while creating new knight.' });
    }
});

router.get('/:knightId', async (req, res) => {
    try {
        const knight = await Knight.findById(req.params.knightId).populate('weapons');

        res.send(knight);
    } catch {
        return res.status(400).send({ error: `Error while listing the knight with the ${req.params.knightId} id.` });
    }
});

router.delete('/:knightId', async (req, res) => {
    try {
        await Knight.findByIdAndRemove(req.params.knightId, async (err, res) => {

            const { name, nickname, birthday, attributes, weapons, keyAttribute } = res;
            const heroes = await Heroes.create({name, nickname, birthday, attributes, keyAttribute});

            heroes.weapons = [];
            await Weapon.remove({ knight_id: heroes._id});
    
            await Promise.all(weapons.map(async weapon => {
                const { name, mod, attr, equipped } = await Weapon.findById(weapon);
                const knightWeapon = new Weapon({ name, mod, attr, equipped, knight_id: heroes._id });

                await knightWeapon.save();
    
                heroes.weapons.push(knightWeapon);
            }))

            await heroes.save();
        });

        res.send({});
    } catch {
        return res.status(400).send({ error: `Error while trying to delete the knight with the ${req.params.knightId} id.` })
    }
});

router.put('/:knightId', async (req, res) => {
    try {
        const { nickname } = req.body;

        const knight = await Knight.findByIdAndUpdate(req.params.knightId, { nickname });

        await knight.save();

        res.send({ knight });
    } catch (err){
        return res.status(400).send({ error: 'Error while updating the knight.' });
    }
});
  
module.exports = router;
