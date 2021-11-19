var express = require('express');
var { multipleMongooseToObject } = require('../util/toolMongoose')
var router = express.Router();
var homeproduct = require('../models/homeproduct')

router.get('/:product', function (req, res, next) {
    const name = req.cookies.nameUser;
    const type = req.params.product;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }

    homeproduct.find({ type: type })
        .then(products => res.render('product', { 
            products: multipleMongooseToObject(products), 
            name: name, 
            role: role, 
            style: 'styleLatestProduct.css',
            responsive: 'responseLatestProduct.css',
            type: type
        }));
})


module.exports = router;