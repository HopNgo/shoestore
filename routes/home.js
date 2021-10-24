var express = require('express');
var { multipleMongooseToObject } = require('../util/toolMongoose')
var router = express.Router();
var homeproduct = require('../models/homeproduct')

let dataBestSeller = {};

router.get('/', function (req, res, next) {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    homeproduct.find({ type: "bestseller" })
        .then(data => {
            dataBestSeller = data;
        });
    homeproduct.find({ type: "latestproduct" })
        .then(products => res.render('home', { 
            products: multipleMongooseToObject(products), 
            bestseller: multipleMongooseToObject(dataBestSeller), 
            name: name, 
            role: role,
            style: 'app.css',
            reponsive: 'responseApp.css'
         }));

})

module.exports = router;