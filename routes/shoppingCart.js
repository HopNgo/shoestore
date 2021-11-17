const express = require('express');
const router = express.Router();
const { cart } = require('../util/toolCart');
const { requireAuth } = require('../middleware/authMiddleware');


router.get('/shop/shopping-cart', requireAuth, function (req, res, next) {
    if (!req.session.cart || req.session.cart.totalPrice == 0) {
        return res.render('cartEmpty');
    }
    const newCart = new cart(req.session.cart);
    console.log(req.session.cart);
    res.render('cart', { productsCart: newCart.generateArray(), totalPrice: newCart.totalPrice, nameUser: req.cookies.nameUser, address: req.cookies.address })
})

module.exports = router;

