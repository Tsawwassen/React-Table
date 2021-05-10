var express = require('express');
var router = express.Router();

/* GET test Route */
router.get('/', function(req, res, next) {
    console.log("inside /api/")
    res.json({status: "success", data: "test data"});
});

module.exports = router;