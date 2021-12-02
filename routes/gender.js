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
    var page = req.query.page;
    page = parseInt(page);
    if (!page || page < 1)
        page = 1;
    const productPerPage = 4;        
    const skip = (page - 1) * productPerPage;
    homeproduct.find({ gender: gender })
        .skip(skip)
        .limit(productPerPage)
        .then(products => { 
            homeproduct.countDocuments({gender: gender})
            .then(total => {
                res.render('product', { 
                    products: multipleMongooseToObject(products), 
                    totalPage: Math.ceil(total / productPerPage),
                    currentPage: page,
                    name: name, 
                    role: role,
                    userid: req.cookies.userid,
                    style: 'styleLatestProduct.css',
                    responsive: 'responseLatestProduct.css',
                    gender: gender
            })
            
        })
    });
})


module.exports = router;