var express = require('express');
var router = express.Router();
var user = require('../models/user');
var bcrypt = require('bcrypt')

router.get('/signin', (req, res, next) => {

    res.render('signin', {style: 'login.css'});
});
router.post('/signin', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({ email: email }, async function (err, data) {
        if (!data) {
            return res.render('signin', {  message: "* Tài khoản không tồn tại ", style: 'login.css' });

        }
        const passwordValid = await bcrypt.compare(password, data.password);
        if (!passwordValid) {
            return res.render('signin', { message: "* Mật khẩu của bạn không đúng", style: 'login.css' })

        }
        res.cookie('userid', data._id.toString());
        res.cookie('nameUser', data.name);
        res.cookie('emailUser', data.email);
        res.cookie('role', data.role);
        res.cookie('address', data.address);
        res.redirect('/');

    })
});


module.exports = router;