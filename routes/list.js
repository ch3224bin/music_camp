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
        var html = '';
        $('.music-list').each(function() {
            var imgSrc = $(this).find('img').attr('src');
            var title = $(this).find('.title').text().trim();
            var singer = $(this).find('.singer').text().trim();
            html += getRow(imgSrc, title, singer);
        });
        res.send(html);
    });
});

var getRow = function(imgSrc, title, singer) {
    return `<div class="row mb-2">
                    <div class="col-sm-12">
                        <div class="media">
                            <div class="media-left">
                                <img class="media-object mw-100" src="${imgSrc}">
                            </div>
                            <div class="media-body p-1">
                                <div><span class="title media-heading h5 mr-1">${title}</span><button class="copy btn btn-outline-primary" type="submit">복사하기</button></div>
                                <p class="h6">${singer}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
}

module.exports = router;
