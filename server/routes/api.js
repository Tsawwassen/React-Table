var express = require('express');
var router = express.Router();

/* Database connection */
var mongoose = require('mongoose');
var ObjectId = require('mongojs').ObjectID;
mongoose.connect('mongodb://localhost/react-table', {useNewUrlParser: true,  useUnifiedTopology: true });

var Items = require('../models/item');

/* GET test Route */
router.get('/', function(req, res, next) {
    console.log("inside /api/")
    res.json({status: "success", data: "test data"});
});

/* GET Table  */
router.get('/table', function(req, res, next) {
    Items.find(req.query)
        .then(items => {
            res.json({status: "success", data: items});
        })
        .catch(error => {
            res.json({status: "error", data: error});
    });
    //res.json({status: "success", data: "test data"});
});
module.exports = router;