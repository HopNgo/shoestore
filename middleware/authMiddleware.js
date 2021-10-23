
module.exports = {
    requireAuth: function (req, res, next) {
        const { cookies } = req;
        if (!cookies.nameUser) {
            res.redirect('/signin');
        }
        next();
    }
}