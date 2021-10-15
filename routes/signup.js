var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/signup', (req, res, nxt) => {
    res.render('signup');
});


router.post('/signup', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    user.findOne({ email: email }, function (err, data) {
        if (data) {
            res.render('signup', { message: "* Tài khoản đã tồn tại" })
        }
        else {
            var newUser = new user();
            newUser.email = email;
            newUser.name = name;
            newUser.role = "user";
            newUser.password = newUser.encryptPassword(password);
            newUser.save();
            res.redirect('/signin');
        }
    })
});


module.exports = router;