let path = require('path');
let config = require('../config');
let pool = require('../database');
let translit = require('translit-rus-eng');
let hello = require('../lib/hello')
let Prise = {};
let red = Prise.myprop;
let nodemailer = require('nodemailer');


Prise.product = async function(req,res){
  let all_product = await pool.query("SELECT id_ FROM product");
  Prise.all_product = all_product;
} 

Prise.alias_collection
Prise.myprop = false;

Prise.getIndexPage = function(req,res){
  console.log(config.public())
  res.render((path.join(config.pages(), 'index')))
  
}


  // Главная страница

Prise.testConnect = async function(req,res){
  // Параметры для маршрута
  let page = "main";
  res.showmore = false;
  let all_product = await pool.query("SELECT id_ FROM product");
  // Выборка из базы товаров
  let product = await pool.query("SELECT * FROM product"
  +" JOIN brands ON product.id_brands = brands.id_brands"
  +" ORDER BY id_ "
  + " LIMIT ? OFFSET ?", [8,0]
  );
  
  let option_product = product.map((a) => a.title_product);
  // Выборка брендров для слайдера
  let brands = await pool.query('SELECT * FROM brands')
  Prise.test = brands;
  let display_more_product = undefined;

  if(product.length > config.limit_product){
    display_more_product = true;
  } else {
    display_more_product = false;
  }

  Prise.string =all_product.length;

  data = {
    brands: brands,
    product: product
  }
  // Транслит тайтлов, для ссылок
  for(i=0; i<product.length; i++){
    let result = translit(option_product[i],'slug');
    product[i].translit_links = result
   
  }
  
  red = false
  res.render(config.pages(), {data, display_more_product,red } );
}


Prise.getCollectionPage = async function(req,res,next){
  res.loli =2;


let result = await hello.getProduct(req,res)
res.myprop = {ololo:12};
// Проверка наличия коллекции из БД
  let collection_heve = false;

    getAliasProduct(result)

  function getAliasProduct(obj){
    getProp(obj);

    function getProp(o){
      for( let prop in o){
        if(typeof o[prop] === "object"){
          getProp(o[prop]);
        } else {
          console.log('Конечное значение' , o[prop]);}
            
          if(req.params.collection === o[prop].translit_links) {
            collection_heve = true;
            console.log(o[prop])
            let test = req.params.collection;
            next()
          console.log(collection_heve);
          } else {
            console.log ('Такой категории нет')
          }
        
        
      }
    }
  }
 
  
}

Prise.getCollectionPageTwo = async function(req,res){
  let { collection } = req.params
  console.log(res.myprop + ">>>>>>>>>>>>>>>>>__________________>>>>>>>>>")

  let option_collection = await pool.query("SELECT title_product, alias, description, texture, title_category, title, `options`, price, link_img, img_link_brands, img_this_collection, title_brands FROM product" 
  +" JOIN category ON product.id_category = category.id_category"
  +" JOIN product_collection ON product.id_ = product_collection.product_id"
  +" JOIN collection ON product_collection.collection_id = collection.id_"
  +" JOIN brands ON product.id_brands = brands.id_brands"
  +" WHERE product.alias = ?", [collection])
  option_collection.forEach(function(el){
   return  console.log(el)
  })

  // Коллекция брендов
  Prise.test;

  option_collection = {
    option_collection: option_collection,
    brnd: Prise.test
  }
  
  

  res.render((path.join(config.pages(), 'page_collection')), {option_collection})
}


Prise.test = function(req,res){
  let data = [{"jon":"oil", "age":33}]
  Prise.test;
  res.send(Prise.test);
}


// POST - кнопка больше

Prise.showMore = function(req,res){

  console.log(req.body.more, "ГГГГГГГГГГГГГГГГГГГГГГГгггг")
  res.myprop = true;
 let next_product = async function(){
    let prod = await pool.query("SELECT * FROM product"
    +" JOIN brands ON product.id_brands = brands.id_brands"
    +" ORDER BY id_ "
    + " LIMIT ? OFFSET ?", [4,product_display]
    );
      return prod;

  }
  function trololo(result){
    console.log(result)
  }
  
  function setdata(result){
    let data_render = {
      more: red,
      data: result
    }

    res.render((path.join(config.pages(), 'moretovar')), {data_render}, function(err,html){
      let dta = {};
      if(html){
        dta.html = html;
      }
      dta.restovar = data_render.data.length;
      
      res.send(dta);
      console.log(dta.html);
    });

  //   res.json(data_render)
  //  return console.log(result + ".-.-..-.-.-.-.-.-.--.-sssss  ")
    return result
   }
   
  Prise.isMore = true;
  let product_display = JSON.parse(req.body.more);
  
  next_product()
  .then(setdata)
  .then(trololo)

}


Prise.newCollection = function(req,res){
  res.render(path.join(config.pages(), 'new-collection'));
}

Prise.callMe = function(req,res){

  let userPhoneNumb = {
    phone: req.body.phone,
    clientname: req.body.name,
    comment: req.body.description
  }


  //  nodemailer setup
  async function main(){
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'k.vitally@yandex.ru', // generated ethereal user
      pass: '!230101V_n!' // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'k.vitally@yandex.ru', // sender address
    to: "kusher.vitally@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
main().then(console.log('успешно'))
main().catch(console.error);



res.send("письмо ушло")











console.log(req.body.name);  


}


module.exports = Prise;