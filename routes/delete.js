var express = require('express');
var router = express.Router();
var homeproduct = require('../models/homeproduct');
const {requireAuth} = require('../middleware/authMiddleware');


router.delete('/admin/manage/delete/:id', requireAuth , function (req, res, next) {
    homeproduct.deleteOne({_id: req.params.id})
        .then(() => {
            res.cookie("messageDelete", "Sản phẩm đã được xóa thành công ");
            res.redirect('/admin/manage');
        })
        .catch(next);

})


module.exports = router;