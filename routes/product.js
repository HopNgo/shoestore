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
   
    var page = req.query.page;
    page = parseInt(page);
    if (!page || page < 1)
        page = 1;
    const productPerPage = 4;        
    const skip = (page - 1) * productPerPage;
    // const start = (page - 1) * productPerPage;
    // const end   = page * productPerPage;
    homeproduct.find({ type: type })
        .skip(skip)
        .limit(productPerPage)
        .then(products => { 
            homeproduct.countDocuments({type: type})
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
                        type: type
                    })
                })
          
        });
        
})


module.exports = router;