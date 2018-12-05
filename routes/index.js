var express = require('express');
var router = express.Router();

var cheerio = require('cheerio');  
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

  var url = 'http://m.imbc.com/radio/Music/1000588100000100000?objid=RAMFM300';  
    request(url, function(error, response, html){  
        if (error) {throw error};

        var $ = cheerio.load(html);
        var option = $('#onair_chart_day').html();
        res.render('index', { option: option });
    });

  
});

module.exports = router;
