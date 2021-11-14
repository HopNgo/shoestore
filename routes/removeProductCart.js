const express = require('express');
const router = express.Router();
const { cart } = require('../util/toolCart');
const homeproduct = require('../models/homeproduct');

router.get('/shop/remove-product-cart/:id', function (req, res, next) {

    const productRemoveID = req.params.id;
    let newCart = new cart(req.session.cart ? req.session.cart : {});
    newCart.removeItemCart(productRemoveID);
    req.session.cart = newCart;
    res.redirect('/shop/shopping-cart');

})

module.exports = router;
