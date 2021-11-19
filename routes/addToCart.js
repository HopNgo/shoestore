const express = require('express');
const router = express.Router();
let { cart } = require('../util/toolCart');
const homeproduct = require('../models/homeproduct');

router.post('/add-to-cart/:id', function (req, res, next) {
    const productID = req.params.id;
    const size = req.body.size;
    const qty = req.body.qty;
    let newCart = new cart(req.session.cart ? req.session.cart : {});

    homeproduct.findById(productID, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        newCart.add(product, productID, qty, size);
        req.session.cart = newCart;
        res.redirect(req.get('referer'));
    })

})

module.exports = router;
