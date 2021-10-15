var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/signin', (req, res, next) => {

    res.render('signin');
});
router.post('/signin', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({ email: email }, function (err, data) {
        if (!data) {
            res.render('signin', { message: "* Tài khoản không tồn tại " });
            return;
        }
        if(!data.authPassword(password)){
            res.render('signin', {message: "* Mật khẩu của bạn không đúng"})
            return;
        }
       
        res.cookie('nameUser', data.name);
        res.cookie('role', data.role);
        res.redirect('/');

    })
});


module.exports = router;