
module.exports = {
    requireAuth: function (req, res, next) {
        const { cookies } = req;
        if (!cookies.nameUser) {
            res.redirect('/signin');
        }
        next();
    },
    adminAuth: function (req, res, next) {
        const {cookies} = req;
        if (!cookies || (cookies.role != 'admin')) {
            res.render('signin', { 
                message: "* Bạn không có quyền truy cập trang này. Vui lòng thử lại",
                style: 'login.css' })
        }
        next();

    }
}