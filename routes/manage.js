var express = require('express');
var { multipleMongooseToObject } = require('../util/toolMongoose')
var router = express.Router();
var homeproduct = require('../models/homeproduct')

router.get('/admin/manage', function (req, res, next) {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    const messageUpdate = req.cookies['messageUpdate'];
    res.clearCookie('messageUpdate');
    homeproduct.find({}, function (err, data) {
        if (err) {
            res.status(400).json('err');
        }
        res.render('manage', { products: multipleMongooseToObject(data), name: name, role: role, messageUpdate: messageUpdate })
    })

})
router.post('/admin/manage', function (req, res, next) {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    const formData = req.body;
    const data = new homeproduct(formData);
    data.save();
    res.render('manage', { messageAdd: "Bạn đã thêm sản phẩm thành công !!", name: name, role: role })
})


module.exports = router;