const express = require('express');
const router = express.Router();
const { cart } = require('../util/toolCart');
const { requireAuth } = require('../middleware/authMiddleware');


router.get('/shop/shopping-cart', requireAuth, function (req, res, next) {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    if (!req.session.cart || req.session.cart.totalPrice == 0) {
        return res.render('cartEmpty', { name: name, role: role });
    }
    let newCart = new cart(req.session.cart ? req.session.cart : {});
    res.render('cart', { name: name, role: role, productsCart: newCart.generateArray(), totalPrice: newCart.totalPrice, nameUser: req.cookies.nameUser, address: req.cookies.address })
})

module.exports = router;

