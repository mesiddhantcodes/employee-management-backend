var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/randi', function(req, res, next) {
  res.send('Ayush the randi ');
});

router.get('/data/:id', function(req, res, next) {
  if(req.params.id<5)
  {
    res.send("the numbe is  less than 5");
  }
  return res.send(req.params.id);
});



router.post('/randi', function(req, res, next) {
  // res.send('Ayush thssssssse randi ');
  const number=req.body.number
  console.log(number);
  res.send(500);
});

module.exports = router;
