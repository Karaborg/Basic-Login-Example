var express = require('express');
var router = express.Router();

var async = require("async");
var mongoose = require('mongoose');
var database = require('../core/database.js');
var model = require('../core/Model/model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/btnLogin',function (req, res) {
  var data = req.body;
  console.log(data)
  try {
    model.list(function (response) {
      for (let i = 0; i < response.accounts.length; i++) {
        if (response.accounts[i].username === data.username && response.accounts[i].password === data.password) {
          res.send(true)
        }else{
          res.send(false)
        }
      }
    })
  } catch (error) {
    console.log("Login User Error: " + error)
  }
});

router.post('/btnCreate',function (req, res) {
  var data = req.body;
  console.log(data)
  try {

    model.list(function (response) {
      for (let i = 0; i < response.accounts.length; i++) {
        if (response.accounts[i].username === data.username) {
          res.send(false)
        }else{
          model.create(data, function(response){
            res.send(true);
            console.log(response);
          })
        }
      }
    })
  } catch (error) {
    console.log("Create User Error: " + error)
    res.send(false)
  }
});

module.exports = router;
