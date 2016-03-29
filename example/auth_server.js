var express = require('express');
var bodyParser = require('body-parser');
var FitbitClient = require('fitbit-client-oauth2');

var app = express();

var clientId = '';
var clientSecret = '';

var client = new FitbitClient(clientId, clientSecret);
var redirect_uri = 'http://localhost:3000/auth/fitbit/callback';
//var redirect_uri = 'http'

app.use(bodyParser());

app.get('/auth/fitbit', function(req, res) {

  var auth_url = client.getAuthorizationUrl('http://localhost:3000/auth/fitbit/callback');

  res.redirect(auth_url);

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
