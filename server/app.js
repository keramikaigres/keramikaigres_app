let express = require('express');
let morgan = require('morgan');
let exphbs = require('express-handlebars');
let app = express();
let path = require('path');
let config = require('./config');
let bodyparser = require('body-parser')
;

//  Пример обработчика
//  let astra = function(req,res,next){
//      req.myprop = function(){
//          return "lol"
//      };
//      next();
//  }


app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


 // Middleware обработчики
 // app.use(astra);
 app.use(function(req,res,next){
    req.my_param =777;
    next()
})
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json())
app.use(express.static(config.pages()));
app.use(function(req,res,next){
 console.log("ip1: " + req.ip + " ip2: " + req.connection.remoteAddress)
next()
})
// Глобальные обработчики
// app.use((req,res,next) => {
//     next();
// })

 // Маршруты
 app.use('/', require('./routes/app.routes'));

 
 app.use(require('./routes/aut'));
 app.use('/links', require('./routes/links'));




 // Статические файлы
app.use('/public', express.static(config.public()));

 // Установка view движка 
app.set('views', config.pages());
app.set('view engine', 'ejs');






 // Старт сервера
app.listen(config.port, function(){
    console.log(path.join( __dirname));
})