var express = require("express");
var router = express.Router();
// Import the model (burger.js) to use its database functions.
var burger = require("../model/burger.js");

// All our routes and set up  where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
        burgers: data
        };

    res.render("index", hbsObject);
    });
});

//CREATE A BURGER TO ADD
router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, false], 
    function(results) {
        //res.json({id: results.insertId});
        res.redirect('/');
    });
});
// DEVOUR A BURGERS
router.post("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    // burger.updateOne(condition, function(result) {
        // if (result.affectedRows == 0) {
        // // If no rows were changed, then the ID must not exist, so 404
        //     return res.status(404).end();
        // } else {
        //     res.status(200).end();
        // }
  
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(data) {
      res.redirect('/');
    }
    );
});

// Export routes for server.js to use.
module.exports = router;
