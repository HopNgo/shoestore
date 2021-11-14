const express = require('express');
const router = express.Router();
const { cart } = require('../util/toolCart');
const homeproduct = require('../models/homeproduct');

router.get('/add-to-cart/:id', function (req, res, next) {
    const productID = req.params.id;
    const newCart = new cart(req.session.cart ? req.session.cart : {});

    homeproduct.findById(productID, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        newCart.add(product, product._id);
        req.session.cart = newCart;
        res.redirect(req.get('referer'));
    })
})

module.exports = router;
