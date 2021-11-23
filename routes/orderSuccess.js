const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
let { cart } = require('../util/toolCart');
router.get('/shop/shopping-cart/order=success', (req, res) => {
    const name = req.cookies.nameUser;
    let role = req.cookies.role;
    if (role == "user") {
        role = "";
    }
    let newCart = new cart(req.session.cart ? req.session.cart : {});
    const listProductCartText = newCart.items.map((item, index) => {
        const priceFormat = Intl.NumberFormat('vi-VN').format(item.price);
        return `<p> <strong> Chi tiết sản phẩm thứ ${index + 1} </strong> </p>
                <ul>
                    <li> Tên giày: ${item.product.name} </li>
                    <li> Thương hiệu: ${item.product.brand} </li>
                    <li> Giá: ${item.product.costNew}.000đ </li>
                    <li> Size: ${item.size} </li>
                    <li> Số lượng : ${item.qty} </li>
                    <li> Thành tiền : ${priceFormat}.000đ </li>
                </ul>`
    })
    const totalPriceFormat = Intl.NumberFormat('vi-VN').format(newCart.totalPrice);
    const discountFormat = Intl.NumberFormat('vi-VN').format(newCart.totalPrice * 10 / 100);
    const totalCartFormat = Intl.NumberFormat('vi-VN').format(newCart.totalPrice + 30 - (newCart.totalPrice * 10 / 100));
    const html = `
        <h2> Bạn có một đơn đặt hàng </h2>
        <h3> Thông tin khách hàng </h3>
        <ul>
             <li> <strong> Tên khách hàng: </strong> ${req.cookies.nameUser} </li>
             <li> <strong> Địa chỉ nhận hàng: </strong> ${req.cookies.address.subDistrict}, ${req.cookies.address.district}, ${req.cookies.address.province} </li>
             <li> <strong> Email: </strong> ${req.cookies.emailUser} </li>
        </ul>
        <h3> Chi tiết đơn hàng </h3>
        ${listProductCartText}
        <p> <strong> Tổng giá trị các sản phẩm: </strong> ${totalPriceFormat}.000đ </p>
        <p> <strong> Giảm giá 10%: </strong> ${discountFormat}.000đ </p>
        <p> <strong> Phí vận chuyển </strong> : 30.000đ </p>
        <h2> Tổng giá trị đơn hàng: ${totalCartFormat}.000đ </h2>
    `
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'nhom7shopgiay@gmail.com',
            pass: 'nhom7AaA'
        },
        tls: {
            rejectUnauthorized: false
        }

    });
    let mailOptions = {
        from: '"thông báo đặt hàng " <nhom7shopgiay@gmail.com>',
        to: '19521554@gm.uit.edu.vn',
        subject: 'Đơn hàng',
        html: html
    };
    transporter.sendMail(mailOptions, (err, infor) => {
        if (err) {
            return console.log(err);
        }
        delete req.session.cart;
        res.render('orderSuccess', { style: 'cart.css', name: name, userid: req.cookies.userid, role: role });
    })
})

module.exports = router;