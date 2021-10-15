
module.exports = {
    requireAuth: function (req, res, next) {
        const { cookies } = req;
        if (!cookies.userID) {
            res.redirect('/signin');
        }
        next();
    }
}