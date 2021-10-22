require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var port = 3000;
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var app = express();
var handlebars = require('express-handlebars');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');
var homeRouter = require('./routes/home');
var destroyCookieRouter = require('./routes/destroyCookie');
var productRouter = require('./routes/product');
var genderRouter = require('./routes/gender');
var brandRouter = require('./routes/brand');
var manageRouter = require('./routes/manage');
var editRouter = require('./routes/edit');
var deleteRouter = require('./routes/delete');
// path database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cookieParser());
// view engine setup
app.engine('handlebars', handlebars({
    helpers: {
        sum: (a, b) => a + b,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));


app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, () => { console.log(`Your port at http://localhost:${port}`) });

module.exports = app;
