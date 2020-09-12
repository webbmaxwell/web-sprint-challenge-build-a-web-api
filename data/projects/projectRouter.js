const express = require('express');
const projectModel = require('../helpers/projectModel');

const router = express.Router();

//create
router.post('/', (req, res) => {
    const projectInfo = req.body
    projectModel
        .insert(projectInfo)
        .then(() => {
            res.status(201).json({ message: "Project created successfully"})
        })
        .catch(err => {
            console.error(err)
        })
})

//read
router.get('/', (req,res) => {
    projectModel
        .get(req.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error retrieving project"})
        })
})

//update
router.put('/:id', (req, res) => {
    const projectInfo = req.body;
    const { id } = req.params;
    projectModel
        .update(id, projectInfo)
        .then(e => {
            if(e) {
                res.status(200).json({ message: "Project updated successfully" })
            } else {
                res.status(404).json({ message: "Project ID not found"})
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: "There was an error updating the project" })
        })
})

//delete
router.delete('/:id', (req, res) => {
    projectModel
        .remove(req.params.id)
        .then(e => {
            if(e > 0) {
                res.status(200).json({ message: "The project has been deleted" })
            } else {
                res.status(404).json({ message: "Project ID not found" })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "There was an error deleting the project" })
        })
})

//getProjectActions

module.exports = router;