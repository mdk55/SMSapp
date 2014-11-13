///Twilio http post http://twimlets.com/echo?Twiml=%3CResponse%3E%3CSms%3EHello+Matthew%2C+thanks+for+the+message%21%3C%2FSms%3E%3C%2FResponse%3E

//else local host http://localhost:3000/inbound
// else localhost ngork  https://74925dc9.ngrok.com/inbound

var Firebase = require('firebase'),
usersRef = new Firebase(' "insert http firebase here without "" " /Users/');
///http specific to Firebase account
 console.log('usersRef %s', usersRef);

var numbers = [];
usersRef.on('child_added', function(snapshot) {
numbers.push( snapshot.val() );
  console.log( 'Added number ' + snapshot.val() );
});


// add a new variable called numbers that contains the phone numbers we want to send messages to:
//var numbers = ['07881463371', '441994342017'];

//require the twilio and cron packages:
var twilio = require('twilio'),
client = twilio('Twilio SiD#', 'Twilio Token'),
cronJob = require('cron').CronJob;


//At the beginning of our app.js file we’ll need to require express and initialize it into a variable called app. We’re also going to use the bodyParser middleware to make it easy to use the data we’ll get getting in our POST request.

var express = require('express'),
bodyParser = require('body-parser'),
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



//Let’s write some code that sends a text message at 5:15m every day:
var textJob = new cronJob( '11 11 * * *', function(){
	//let’s update the code in our textJob to loop over these phone numbers and send a message to them:
//	for( var i = 0; i < numbers.length; i++ ) {
 // client.sendMessage( { to:numbers[i], from:'441994342017', body:'Hello! This is a test sms response line.'}, function( err, data ) {
//    console.log( data.body );
//  });
//}
//YOURTWILIONUMBER
  client.sendMessage( { to:'07881463371', from:'441994342017', body:'Your burning baby, tssssss !' }, function( err, data ) {});
},  null, true);



//We’re going to add a route for /message that responds with some TwiML. TwiML is a basic set of instructions you can use to tell Twilio what to do when you receive an incoming call or SMS message. Our code will look like this:


app.post('/message', function (req, res) {
  var resp = new twilio.TwimlResponse();
  if( req.body.Body.trim().toLowerCase() === '11:11:11' ) {
    var fromNum = req.body.From;
    if(numbers.indexOf(fromNum) !== -1) {
      resp.message('You have already subscribed to hell, my friend !');
    } else {
      resp.message('Bwahahaha, you are now a member of the Hell. Reply "STOP" to stop receiving Hell Raiser updates.');
      usersRef.push(fromNum);
    }
  } else {
    resp.message('Welcome to Hell Raiser Updates. Text "11:11:11" to receive a SECRET message every night at 11.11.11.');
  }
 
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
 
});

app.get('/',function(req,res){
	res.send("Hey");
});

//let’s set our server to listen on port 3000.

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});





