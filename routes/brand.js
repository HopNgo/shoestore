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
    var page = req.query.page;
    page = parseInt(page);
    if (!page || page < 1)
        page = 1;
    const productPerPage = 4;        
    const skip = (page - 1) * productPerPage;
    homeproduct.find({ brand: brand })
    .   skip(skip)
        .limit(productPerPage)
        .then(products => { 
            homeproduct.countDocuments({brand: brand})
            .then(total => {
                res.render('product', { 
                    products: multipleMongooseToObject(products), 
                    totalPage: Math.ceil(total / productPerPage),
                    currentPage: page,
                    name: name, 
                    userid: req.cookies.userid,
                    role: role,
                    style: 'styleLatestProduct.css',
                    responsive: 'responseLatestProduct.css',
                    brand: brand
            })
        })
    });
})


module.exports = router;