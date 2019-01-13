const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorite = require('../models/favorite');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((fav) => {
        console.log('FINE')
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user})
    .then((fav) => {
        if (fav === null){
            Favorite.create({user: req.user._id, dishes: []})
            .then((fav) => {
                req.body.map((dish) => {fav.dishes.push(dish)});
                fav.save()
                .then((fav) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(fav);
                })
            })
        }
        else {
            req.body.map((dish) => {
                let index = -1;
                for(var i=0;i<fav.dishes.length;i++)
                    if(fav.dishes[i]._id==dish._id){index=i;break;}
                if (index === -1) {fav.dishes.push(dish)}
            });
            fav.save()
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
              })        
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndRemove({user: req.user})
    .then((fav) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
});



favoritesRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user})
    .then((fav) => {
        if (fav === null){
            Favorite.create({user: req.user._id, dishes: []})
            .then((fav) => {
                fav.dishes.push(req.params.dishId)
                fav.save()
                .then((fav) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(fav);
                })
            })
        }
        else {
            let index = -1;
            for(var i=0;i<fav.dishes.length;i++)
                if(fav.dishes[i]._id==req.params.dishId){index=i;break;}
            if (index === -1){
                fav.dishes.push(req.params.dishId)
                fav.save()
                .then((fav) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(fav);
                })
            }
            else{
                err = new Error('This dish allways added');
                err.statusCode = 403;
                res.setHeader('Content-Type', 'text/html');
                return next(err);
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user})
    .then((fav) => {
        let index = -1;
        for(var i=0;i<fav.dishes.length;i++)
            if(fav.dishes[i]._id==req.params.dishId){index=i;break;}
        if (index !== -1){
            fav.dishes.splice(index, 1);
            fav.save()
            .then((fav) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            })
        }
        else{
            err = new Error('This dish allways deleted');
            err.statusCode = 403;
            res.setHeader('Content-Type', 'text/html');
            return next(err);
        }
    })
});

module.exports = favoritesRouter;