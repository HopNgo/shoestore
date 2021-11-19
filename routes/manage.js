var express = require('express');
var { multipleMongooseToObject } = require('../util/toolMongoose')
var router = express.Router();
var homeproduct = require('../models/homeproduct');
const { adminAuth } = require('../middleware/authMiddleware');

router.get('/admin/manage', adminAuth, function (req, res, next) {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    const messageUpdate = req.cookies['messageUpdate'];
    res.clearCookie('messageUpdate');
    const messageDelete = req.cookies['messageDelete'];
    res.clearCookie('messageDelete');
    const messageAdd = req.cookies['messageAdd'];
    res.clearCookie('messageAdd');
    homeproduct.find({}, function (err, data) {
        if (err) {
            res.status(400).json('err');
        }
        res.render('manage', { 
            products: multipleMongooseToObject(data), 
            name: name, 
            role: role, 
            messageUpdate: messageUpdate, 
            messageDelete: messageDelete, 
            messageAdd: messageAdd,
            style: 'manage.css',
        })
    })

})
router.post('/admin/manage', adminAuth, function (req, res, next) {

    const formData = req.body;
    const data = new homeproduct(formData);
    data.save();
    res.cookie("messageAdd", "Sản phẩm đã được thêm thành công");
    res.redirect('/admin/manage');
})


module.exports = router;