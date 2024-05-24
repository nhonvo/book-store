var express = require('express');
var router = express.Router();
var publisherModel = require('../schemas/publisher')
var modelPublisher = require('../models/publisher');
var responseData = require('../helpers/responseData');

//localhost:3000/publisher

router.get('/', async function (req, res, next) {
  console.log(req.query);
  var publisherAll = await modelPublisher.getAll(req.query);
  responseData.responseReturn(res, 200, true, publisherAll);
});

router.get('/:id', async function (req, res, next) {
  try {
    var publisher = await modelPublisher.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, publisher);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay nha xuat ban");
  }
});

router.post('/', async function (req, res, next) {
  try {    
    var newPublisher = new publisherModel({
      name: req.body.name,
      isDelete : false
    })
    var publisher = await modelPublisher.createPublisher(newPublisher);
    responseData.responseReturn(res, 200, true, publisher);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay nha xuat ban");
  }
});

router.put('/:id', async function (req, res, next) {
  try {    
    var publisher = await modelPublisher.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, publisher);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay nha xuat ban");
  }
});

router.delete('/:id', async function (req, res, next) {//delete by Id
  try {
    var publisher = await modelPublisher.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay nha xuat ban");
  }
});

module.exports = router;
