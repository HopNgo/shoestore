var express = require('express');
var router = express.Router();
var user = require('../models/user');
var bcrypt = require('bcrypt')

router.get('/signin', (req, res, next) => {

    res.render('signin');
});
router.post('/signin', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({ email: email }, async function (err, data) {
        if (!data) {
            return res.render('signin', { sytle: 'login.css', message: "* Tài khoản không tồn tại " });

        }
        const passwordValid = await bcrypt.compare(password, data.password);
        if (!passwordValid) {
            return res.render('signin', { sytle: 'login.css',message: "* Mật khẩu của bạn không đúng" })

        }

        res.cookie('nameUser', data.name);
        res.cookie('role', data.role);
        res.redirect('/');

    })
});


module.exports = router;