var express = require('express');
var { mongooseToObject } = require('../util/toolMongoose')
var router = express.Router();
var homeproduct = require('../models/homeproduct')

router.get('/product/:slug', function (req, res, next) {
    const name = req.cookies.nameUser;
    const type = req.params.product;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }

    homeproduct.findOne({ slug: req.params.slug })
        .then(function(product) {
            product =  mongooseToObject(product);
            res.render('detailProduct', {
                product: product,
                name: name, 
                role: role,
                style: 'detailProduct.css'
            });
        })
        .catch(next)

})


module.exports = router;