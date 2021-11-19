require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const handlebars = require('express-handlebars');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const homeRouter = require('./routes/home');
const destroyCookieRouter = require('./routes/destroyCookie');
const productRouter = require('./routes/product');
const genderRouter = require('./routes/gender');
const brandRouter = require('./routes/brand');
const manageRouter = require('./routes/manage');
const editRouter = require('./routes/edit');
const deleteRouter = require('./routes/delete');
const searchRouter = require('./routes/search');
const addToCartRouter = require('./routes/addToCart');
const shoppingCartRouter = require('./routes/shoppingCart');
const detailProductRouter = require('./routes/detailProduct');
const removeProductCartRouter = require('./routes/removeProductCart');
const orderSuccessRouter = require('./routes/orderSuccess');

//session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'topsecret'
}))

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
})
// path database
mongoose.connect('mongodb://localhost:27017/Shop1', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cookieParser('mysecret'));
// view engine setup
app.engine('handlebars', handlebars({
    helpers: {
        sum: (a, b) => a + b,
        discount: (a) => a * 10 / 100,
        totalOrder: (a) => a - (a * 10 / 100) + 30,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));


app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', detailProductRouter);
app.use('/', searchRouter);
app.use('/', signinRouter);
app.use('/', signupRouter);
app.use('/', homeRouter);
app.use('/', destroyCookieRouter);
app.use('/', genderRouter);
app.use('/', brandRouter);
app.use('/', productRouter);
app.use('/', manageRouter);
app.use('/', editRouter);
app.use('/', deleteRouter);
app.use('/', addToCartRouter);
app.use('/', shoppingCartRouter);
app.use('/', removeProductCartRouter);
app.use('/', orderSuccessRouter);

app.listen(port, () => { console.log(`Your port at http://localhost:${port}`) });

module.exports = app;
