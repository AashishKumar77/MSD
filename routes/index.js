var express = require('express');
var router = express.Router();
var cors = require('cors')
var analyseResults = require('../functions/analyseResults');
var apiCall = require('../functions/apiCall');

// HTTP GET request home page.
router.get('/', function(req, res, next) {
  
  //render page
  res.render('index', { title: 'Meta Tag Analyser | MSD' });
});


router.get('/login', function (req, res) {
  res.render('login', { title: 'Meta Tag Analyser | MSD' });
});

//HTTP POST request home page
router.post('/', function(req, res){
  var reqURL = req.body['siteURL'];
  var response = apiCall.get(reqURL);
  if (response.error){
    //RETURN TO VIEW
    res.render('index', { title: 'Meta Tag Analyser | MSD', response});
  }
  else {
    var results = analyseResults.analyse(response.responseContent);

    //store request url to return to view
    results.url = reqURL;

    //RETURN TO VIEW
    res.render('index', { title: 'Meta Tag Analyser | MSD', results});
  };

});

//HTTP GET api
router.get('/api/:requrl', cors(), function(req, res){
  var reqURL = req.params.requrl;
  var response = apiCall.get(reqURL);
  if (response.error){
    //RETURN TO VIEW
    res.json(response);
  }else {
    var results = analyseResults.analyse(response.responseContent);
    //store request url to return to view
    results.url = reqURL;
    //RETURN TO VIEW
    res.json( results );
  };

});


// HTTP GET api, catch any paramter that is not allow / incorrect format
router.get('/api*' , cors(), function(req, res, next) {
  
  //render page
  res.json({error: "This is an api route, it requires an encoded url parameter"});
});

module.exports = router;
