var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'nhon' });
});

router.use('/authens', require('./authens'));
router.use('/authors', require('./authors'));
router.use('/books', require('./books'));
router.use('/items', require('./items'));
router.use('/users', require('./users'));
router.use('/publishers', require('./publishers'));

module.exports = router;
