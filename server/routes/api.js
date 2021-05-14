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
});

/** UPDATE Table */
/** Dev Note
 *      when making the update query, I think I can make the query variable look nicer (ie not in a hash like below)
 * 
 */
router.put('/table', function(req, res, next){
    Items.updateOne({_id: req.body._id}, {$set: req.body})
    .then(item => {
        res.json({status: "updated"})
    }).catch(error => {
        res.json({status: "error"});
    });
});

module.exports = router;