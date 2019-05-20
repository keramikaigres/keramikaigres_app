let express = require('express');
let router = express.Router();
let IndexPageController = require('../controllers/app.controller')
let mass = require('../lib/hello')




router.get('/new-collection', IndexPageController.newCollection);
router.get('/contact', function(req,res){
res.send("contact")
 })
router.get('/qwe',function(req,res){
res.send('qwe')
})

// router.get('/', IndexPageController.getIndexPage);
router.get('/', IndexPageController.testConnect);
router.post('/', IndexPageController.showMore);
router.post('/callme', IndexPageController.callMe);

router.get('/test', IndexPageController.test)


router.get('/:collection', function(req,res,next){ 
    app = req.loli;
    console.log('в консоли другой обработчик');
    next(); 
})
    
 router.get('/:collection', IndexPageController.getCollectionPage)
 router.get('/:collection', IndexPageController.getCollectionPageTwo)


 

module.exports = router; 