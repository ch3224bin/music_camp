var express = require('express');
var router = express.Router();

var cheerio = require('cheerio');  
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    var url = `http://m.imbc.com/Radio/RetrieveTrackList?objid=RAMFM300&seq=${req.query.seq}`;  
    request(url, function(error, response, html){  
        if (error) {throw error};

        var $ = cheerio.load(html);
        var list = $('body');
        list.find('.title').after('<button class="copy">복사하기</button>');
        res.send(list.html());
    });
});

module.exports = router;
