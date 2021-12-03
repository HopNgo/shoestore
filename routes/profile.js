var express = require('express');
var router = express.Router();
var { mongooseToObject } = require('../util/toolMongoose')
var user = require('../models/user');
var bcrypt = require('bcrypt')

router.get('/profile/:id', (req, res, next) => {
    const name = req.cookies.nameUser;
    const id = req.params.id;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    user.findById(id)
        .then(function (user) {
            user = mongooseToObject(user);
            res.render('profile', {
                user: user,
                role: role,
                userid: req.cookies.userid,
                name: name,
                style: 'profile.css',
                success: req.flash('success'),
                error: req.flash('error')
            });
        })
        .catch(next)
});
router.put('/profile/:id', function (req, res, next) {
    user.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.cookie('nameUser', req.body.name);
            req.flash('success', 'Cập nhật thành công!')
            res.redirect('back');
        })
        .catch(next);

})

router.put('/profile/change-password/:id', function (req, res, next) {
    const { oldPass, newPass } = req.body;
    const id = req.params.id;

    user.findById(id)
        // Kiem tra mat khau cu
        .then(async function (user) {
            const passwordValid = await bcrypt.compare(oldPass, user.password);
            if (!passwordValid) {
                return false;
            }
            else {
                const hashPassword = await bcrypt.hash(newPass, 10);
                return hashPassword;
            }
        })
        .then(function (pass) {
            if (pass) {
                user.updateOne({ _id: req.params.id }, { password: pass })
                    .then(function () {
                        req.flash('success', 'Cập nhật thành công!')
                        res.redirect('back');
                    })
            }
            else {
                req.flash('error', 'Thất bại!')
                return res.redirect('back');
            }

        })
        .catch(next)
})

router.put('/profile/change-address/:id', (req, res, next) => {
    const id = req.params.id;
    const { province, district, subDistrict } = req.body;
    const data = {
        province: province,
        district: district,
        subDistrict: subDistrict
    }
    user.updateOne({ _id: id }, {
        address: data,
    })
        .then(() => {
            res.cookie('address', data);
            req.flash('success', 'Cập nhật thành công!')
            res.redirect('back');
        })
        .catch(next);

})

module.exports = router;