const Twit = require('twit');
const fs = require('fs');

//read info from txt file
const k = fs.readFileSync('twitter-bot/keys.txt', 'utf-8').split("\n")

//create new twitter object
const Twitter = new Twit({
    consumer_key:         k[0],
    consumer_secret:      k[1],
    access_token:         k[2],
    access_token_secret:  k[3],
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

// Setting up a user stream, filters tweets by only mentions
const stream = Twitter.stream('statuses/filter', { track: '@gradyentapp' });

//NEED TO FIX BUG, NOT CONSOLE LOGGING
stream.on('tweet', function (tweet) {
  console.log(tweet);
})

//post example
// Twitter.post('statuses/update', { status: 'I have awakened.' }, function(err, data, response) {
//   err ? console.error(err) : console.log(data);
// })