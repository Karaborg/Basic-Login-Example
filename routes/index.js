var express = require('express');
var router = express.Router();

var model = require('../core/Model/model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/btnLogin',function (req, res) {
  var data = req.body;

  model.findById(data.username, function (response) {
    if(response.account != null && response.account.password === data.password){
      res.send(true);
    }else{
      res.send(false);
    }
  });

});

router.post('/btnCreate',function (req, res) {
  var data = req.body;
  console.log('HERE: ', data);

  model.findById(data.username, function (response) {
    if(response.success){
      if(response.account == null){

        model.create(data, function (response) {
          if (response.success){
            console.log(response);
            res.send('done');
          } else{
            console.log('Failed to add');
          }
        });
      }else{
        res.send('no');
        console.log('Already have this!');
      }
    }
  });

});

module.exports = router;
