// Our Twitter library
var Twit = require('twit');
var q = require('q');
var request = require('request');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var postInsult = function() {
	q.nfcall(request, 'http://quandyfactory.com/insult/json')
		.then(function(resArr) {
			var res = resArr[0];
			if(res.statusCode == 200) {
				var insult = JSON.parse(resArr[1]).insult;
				return insult;
			}
			else {
				return new Error('insult get failed');
			}
		})

		.then(function(insult) {
			console.log(insult);

			var tweet = "Dear #CodeDay #Chicago, "+insult+" - www.quandyfactory.com/insult (Sincerely, @CodeDay #PDX) ;)";
			console.log(tweet.length);
			return q.ninvoke(T, "post", 'statuses/update', { status: tweet });
		})

		.then(function(resArr) {
			//console.log(resArr[0], resArr[1]);
		})

		.catch(function(err) {
			console.log(err);
		});
};

var intervalId = setInterval(postInsult, 10000);

setTimeout(function() { clearInterval(intervalId); }, 1000*60*10);