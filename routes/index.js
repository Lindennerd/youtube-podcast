var express = require('express');
var downloader = require('../downloader'); 

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/download', function (req, res, next) {
	var dl = new downloader();

	dl.getMP3(req.body.url)
		.then(function(data) {
			res.send(data);
		})
		.catch(function(error) {
			res.status(500).send(error);
		})
})

module.exports = router;
