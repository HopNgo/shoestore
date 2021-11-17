const express = require('express');
const router = express.Router();
const homeproduct = require('../models/homeproduct');
const { multipleMongooseToObject } = require('../util/toolMongoose')


router.get('/search', (req, res, next) => {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    let searchWord = req.query.q;
    if (searchWord) {
        homeproduct.find({ name: new RegExp(searchWord, 'i') }, function (err, data) {
            if (err) {
                return res.status(500).json('error');
            }
            if (data.length == 0) {
                return res.status(404).render('search', { 
                    valueSearch: searchWord, 
                    messageErrorNotFound: `Sản phẩm " ${searchWord} " không tìm thấy !!`, 
                    role: role, 
                    name: name,
                    style: 'search.css'
                });
            }
            return res.render('search', { 
                valueSearch: searchWord, productSearch: multipleMongooseToObject(data), 
                role: role,
                name: name,
                style: 'search.css'

             });
        })
    }
    else {
        return res.status(404).render('search', { 
            messageErrorNotFound: "Sản phẩm của bạn không tìm thấy !!", 
            role: role,
            name: name,
            style: 'search.css'
         })
    }
})

module.exports = router;