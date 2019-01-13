const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promo = require('../models/promotions');
var authenticate = require('../authenticate');
const cors = require('./cors');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(cors.cors, (req, res, next) => {
    Promo.find({})
    .then((promo) => {
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Promo.create(req.body)
    .then((promo) => {
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/html');
    res.end('Operation PUT not supported on /promo');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Promo.remove({})
    .then((promo) => {
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})


promotionRouter.route('/:prId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.cors, (req, res, next) =>{
    Promo.findById(req.params.prId)
    .then((promo) => {
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) =>{
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/html');
    res.end('Operation PUT not supported on /leaders');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) =>{
    Promo.findByIdAndUpdate(req.params.prId, req.body)
    .then((promo) => {
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  (req, res, next) => {
    Promo.findByIdAndRemove(req.params.prId)
    .then((promo) => {
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = promotionRouter;