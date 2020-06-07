const express = require('express');
const router = express.Router();
const Bear = require('../models/bear');

// get all bears from the db
router.get('/bears', function(req, res, next) {
    Bear.find({}).then(function(bear){
        res.send(bear);
    }).catch(next); 
});

// get specific bear from the db
router.get('/bears/:id', function(req, res, next) {
    Bear.findById(req.params.id).then(function(bear){
        res.send(bear);
    }).catch(next); 
});

// add a new bear to the db
router.post('/bears', function(req, res, next) {
    Bear.create(req.body).then(function(bear){
        res.send(bear);
    }).catch(next);
});

// update a bear in the db
router.put('/bears/:id', function(req, res, next){
    Bear.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Bear.findOne({_id: req.params.id}).then(function(bear){
            res.send(bear);
        });
    }).catch(next);
});

// delete a bear in the db
router.delete('/bears/:id', function(req, res, next) {
    Bear.findByIdAndRemove({_id: req.params.id}).then(function(bear){
        res.send(bear);
    }).catch(next);
});

module.exports = router;