let config = require('../config');
let pool = require('../database');
let translit = require('translit-rus-eng');


mass = {};

mass.getProduct = async function(req,res){
    let product = await pool.query('SELECT title_product FROM product');
    let option_product = product.map((a) => a.title_product);
    for(i=0; i<product.length; i++){
        let result = translit(option_product[i],'slug');
        product[i].translit_links = result;
       console.log(product[i].translit_links) 
    }
    
    return product;
}
module.exports = mass;