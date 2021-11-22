var express = require('express');
var { multipleMongooseToObject } = require('../util/toolMongoose')
var router = express.Router();
var homeproduct = require('../models/homeproduct')

router.get('/gender/:slug', function (req, res, next) {
    const name = req.cookies.nameUser;
    const gender = req.params.slug;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }

    homeproduct.find({ gender: gender })
        .then(products => res.render('product', { 
            products: multipleMongooseToObject(products), 
            name: name, 
            role: role,
            userid: req.cookies.userid,
            style: 'styleLatestProduct.css',
            responsive: 'responseLatestProduct.css',
            gender: gender

        }));
})


module.exports = router;