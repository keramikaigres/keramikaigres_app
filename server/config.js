let path = require('path')



module.exports = {

port : 3000,    
pages : () => {
   let PAGES = __dirname;
   let path_pages = PAGES.substring(0, PAGES.length - 7) + "/pages";
    return path_pages;
},
public : () => {
    let PAGES = __dirname;
    let path_public = PAGES.substring(0, PAGES.length -7) + "/public";
    return path_public;
},
limit_product: 4, // Лимит продуктов на шлавной - от 8






}