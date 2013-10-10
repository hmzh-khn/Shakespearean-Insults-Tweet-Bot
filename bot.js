// Our Twitter library
var Twit = require('twit');
var firsthalf;
var secondhalf;
var tweet;
var fulltweet;

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var mediaArtsSearch = {q: '"Why do I"', count: 2, result_type: "recent"}; 
var answer = {q: "Because I can", count: 2, result_type: "recent"};

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  // If our search request to the server had no errors...
	//console.log(error, data);
	 if(!error)
		{
			var tweet = data.statuses[0].text;
			var arr = tweet.split(".");
			var question = "";
			var tweetnum;
			var endindex;
			var punctutations = ".,:;?";
			for( var i = 0; i<arr.length; i++ )
			{
				var smallerarr = arr[i].split(" ");
				for(var k = 0; k<smallerarr.length; k++)
				{
					if( smallerarr[k] == "Why" )
					{
						var index = tweet.indexOf("Why");
					}
					else if(smallerarr[k] == "why" )
					{
						var index = tweet.indexOf("why");
					}
					//console.log(smallerarr[k]);
					//var regex = /[^\.\?,-\/#!@$%\^&\*;:{}=\-_`~()]/;
					//if(!regex.test(smallerarr[k])){endindex=smallerarr[k];console.log('penis');}
					firsthalf=tweet.substr(index);
					//firsthalf = tweet.substring(index,endindex);	

			}
			//console.log(firsthalf);
			fulltweet = firsthalf;
		}
		//var firsthalf = arr[tweetnum];
		T.get('search/tweets', answer, function(error,data)
		{
			//console.log(error,data);
			if(!error)
			{
				var tweeta = data.statuses[0].text;
				var arr = tweeta.split(".");
				var question = "";
				var tweetnum;
				for( var i = 0; i<arr.length; i++ )
				{
					var smallerarr = arr[i].split(" ");
					for(var k = 0; k<smallerarr.length; k++)
					{
						if( smallerarr[k] == "Because" )
						{
							var index = tweeta.indexOf("Because");
							secondhalf = tweeta.substr(index);
						}
						else if(smallerarr[k] == "because" )
						{
							var index = tweeta.indexOf("because");
							secondhalf = tweeta.substr(index);
						}				
					}
				}
			}
			fulltweet = fulltweet+ "? " + secondhalf;
			T.post('statuses/update', { status: fulltweet }, function(err, reply) {
				if(error){
					console.log('There was a problem posting your tweet');
				}
				})
		});
		
	  }
	  
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});

	
	
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60*5);