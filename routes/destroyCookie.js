var express = require('express');
var router = express.Router();


router.get('/destroy-cookie', function (req, res, next) {
        res.clearCookie("nameUser");
        res.clearCookie("role");
        res.redirect('/');
})



module.exports = router;