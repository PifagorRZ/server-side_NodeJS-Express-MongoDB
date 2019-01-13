const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
var authenticate = require('../authenticate');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    Leaders.find({})
    .then((leaders) => {
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/html');
    res.end('Operation PUT not supported on /leaders');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Leaders.remove({})
    .then((leader) => {
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})


leaderRouter.route('/:leadId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.cors, (req, res, next) =>{
    Leaders.findById(req.params.leadId)
    .then((dish) => {
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) =>{
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/html');
    res.end('Operation PUT not supported on /leaders');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) =>{
    Leaders.findByIdAndUpdate(req.params.leadId, req.body)
    .then((leader) => {
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leadId)
    .then((leader) => {
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = leaderRouter;