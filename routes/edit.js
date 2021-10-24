var express = require('express');
const { mongooseToObject } = require('../util/toolMongoose');
var router = express.Router();
var homeproduct = require('../models/homeproduct')

router.get('/admin/manage/edit/:id', function (req, res, next) {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    homeproduct.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(400).json('err');
        }
        res.render('edit', { 
            productEdit: mongooseToObject(data), 
            name: name, 
            role: role,
            style: 'edit.css'
        });
    })

})
router.put('/admin/manage/edit/:id', function (req, res, next) {
    homeproduct.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.cookie("messageUpdate", "Cập nhật sản phẩm thành công");
            res.redirect('/admin/manage');
        })
        .catch(next);

})


module.exports = router;