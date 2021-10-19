var express = require('express');
var router = express.Router();
var user = require('../models/user');
var bcrypt = require('bcrypt');

router.get('/signup', (req, res, nxt) => {
    res.render('signup');
});


router.post('/signup',  (req, res, next) => {
    const { name, email, password } = req.body;
    user.findOne({ email: email },async function (err, data) {
        if (data) {
            res.render('signup', { message: "* Tài khoản đã tồn tại" })
            return;
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new user({
                name: name,
                email: email,
                role: "user",
                password: hashPassword
            })
            newUser.save();
            res.redirect('/signin');
        }
    })




});


module.exports = router;