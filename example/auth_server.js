var express = require('express');
var bodyParser = require('body-parser');
var FitbitClient = require('fitbit-client-oauth2');
var config = require('./../src/config')
var app = express();

var clientId = '227NXZ';
var clientSecret = 'b9d240939f4d944e93bb4ec5eed00b49';

var client = new FitbitClient(clientId, clientSecret);
var redirect_uri = 'http://localhost:3000/auth/fitbit/callback';
//var redirect_uri = 'http'

app.use(bodyParser());

app.get('/auth/fitbit', function(req, res) {

  var auth_url = client.getAuthorizationUrl('http://localhost:3000/auth/fitbit/callback');

  res.redirect(auth_url);

});

app.get('/auth/fitbit/heartrate', function(req,res) {
//  var client.options = options;
//  console.log(client['oauth2_token']['api']);

//  clien
//    var redirect_uri = 'http://different_redirect_uri';
console.log(config);
    var scope = config.FITBIT_DEFAULT_SCOPE;
    scope.push('heartrate');
  console.log(client);

    var state = 'KEEP_THIS_STATE';
    var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope, state);
    var final_url = 'https://fitbit.com/oauth2/authorize?redirect_uri=' + redirect_uri + '&scope=activity&scope=nutrition&scope=profile&scope=settings&scope=sleep&scope=social&scope=weight&scope=heartrate&scope=heartrate&response_type=code&client_id='+clientId;

//    expect(authorization_uri).to.eql(final_url);
//  res.json('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json');
//  req.send(final_url)
//  res.writeHead(200, {Authorization: 'Bearer ' + options.access_token,
//      'Accept-Language': acceptLanguage})
  res.send('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json');

});


app.get('/auth/fitbit/callback', function(req, res, next) {

  client.getToken(req.query.code, redirect_uri)
    .then(function(token) {

      // ... save your token on session or db ...

      // then redirect
      //res.redirect(302, '/user');

      res.send(token);

    })
    .catch(function(err) {
      // something went wrong.
      res.send(500, err);

    });

});

app.listen(3000);
