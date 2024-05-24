var express = require('express');
var router = express.Router();
var bookModel = require('../schemas/book')
var modelBook = require('../models/book');
var responseData = require('../helpers/responseData');

//localhost:3000/books
router.get('/', async function (req, res, next) {
  console.log(req.query);
  var booksAll = await modelBook.getAll(req.query);
  responseData.responseReturn(res, 200, true, booksAll);
});

router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var book = await modelBook.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, book);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay sach");
  }
});

router.post('/', async function (req, res, next) {
  try {    
    var newBook = new bookModel({
      name: req.body.name,
      year: req.body.year,
      author: req.body.author,
      publisher: req.body.publisher
    })
    var book = await modelBook.createBook(newBook);
    responseData.responseReturn(res, 200, true, book);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay sach");
  }
});

router.put('/:id', async function (req, res, next) {
  try {    
    var book = await modelBook.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, book);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay sach");
  }
});

router.delete('/:id', async function (req, res, next) {//delete by Id
  try {
    var book = await modelBook.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay book");
  }
});

module.exports = router;
