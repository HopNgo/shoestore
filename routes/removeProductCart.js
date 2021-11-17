const express = require('express');
const router = express.Router();
const { cart } = require('../util/toolCart');
const homeproduct = require('../models/homeproduct');

router.post('/shop/remove-product-cart/:id', function (req, res, next) {

    const productRemoveID = req.params.id;
    const productRemoveSize = req.body.size;

    let newCart = new cart(req.session.cart ? req.session.cart : {});
    newCart.removeItemCart(productRemoveID, productRemoveSize);
    req.session.cart = newCart;
    res.redirect('/shop/shopping-cart');

})

module.exports = router;
