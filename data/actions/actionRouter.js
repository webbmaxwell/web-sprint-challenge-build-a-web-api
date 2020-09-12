const express = require('express');
const actionModel = require('../helpers/actionModel');

const router = express.Router();

router.post('/', (req, res) => {
    const actionInfo = req.body
    actionModel
        .insert(actionInfo)
        .then(e => {
            res.status(201).json([{ message: "Action successfully created" }, e])
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Unable to create action" })
        })
})

router.get('/', (req, res) => {
    actionModel
        .get(req.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Unable to retrieve actions" })
        })
})

router.put('/:id', (req, res) => {
    const actionInfo = req.body;
    const { id } = req.params;
    actionModel
        .update(id, actionInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "Action successfully updated" })
            } else {
                res.status(404).json({ message: "ID not found" })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Unable to update action" })
        })
})

router.delete('/:id', (req, res) => {
    actionModel
        .remove(req.params.id)
        .then(e => {
            res.status(200).json({ message: "Action successfully deleted" })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Unable to delete action" })
        })
})

module.exports = router;