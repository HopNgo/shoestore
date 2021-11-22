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
                name: name,
                style: 'profile.css'
            });
        })
        .catch(next)
});
router.put('/:id', function (req, res, next) {
    user.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.cookie('nameUser', req.body.name);
            res.redirect('back');
        })
        .catch(next);

})


module.exports = router;