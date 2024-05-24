var express = require('express');
var router = express.Router();
var authorModel = require('../schemas/author')
var modelAuthor = require('../models/author');
var responseData = require('../helpers/responseData');

//localhost:3000/authors

router.get('/', async function (req, res, next) {
  console.log(req.query);
  var authorsAll = await modelAuthor.getAll(req.query);
  responseData.responseReturn(res, 200, true, authorsAll);
});

router.get('/:id', async function (req, res, next) {
  try {
    var author = await modelAuthor.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, author);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay tac gia");
  }
});

router.post('/', async function (req, res, next) {
  try {    
    var newAuthor = new authorModel({
      name: req.body.name,
      isDelete : false
    })
    var author = await modelAuthor.createAuthor(newAuthor);
    responseData.responseReturn(res, 200, true, author);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay tac gia");
  }
});

router.put('/:id', async function (req, res, next) {
  try {    
    var author = await modelAuthor.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, author);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay tac gia");
  }
});

router.delete('/:id', async function (req, res, next) {//delete by Id
  try {
    var author = await modelAuthor.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay tac gia");
  }
});

module.exports = router;
