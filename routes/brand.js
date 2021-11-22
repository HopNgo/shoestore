var express = require('express');
var { multipleMongooseToObject } = require('../util/toolMongoose')
var router = express.Router();
var homeproduct = require('../models/homeproduct')

router.get('/brand/:slug', function (req, res, next) {
    const name = req.cookies.nameUser;
    const brand = req.params.slug;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }

    homeproduct.find({ brand: brand })
        .then(products => res.render('product', { 
            products: multipleMongooseToObject(products), 
            name: name, 
            userid: req.cookies.userid,
            role: role,
            style: 'styleLatestProduct.css',
            responsive: 'responseLatestProduct.css',
            brand: brand
        }));
})


module.exports = router;