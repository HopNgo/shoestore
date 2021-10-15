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
    res.render('manage', { name: name, role: role })

})
router.post('/admin/manage', function (req, res, next) {
    const formData = req.body;
    const data = new homeproduct(formData);
    data.save();
    res.render('manage', { message: "Bạn đã thêm sản phẩm thành công !!" })
})


module.exports = router;