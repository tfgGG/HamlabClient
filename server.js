const express = require('express');
var path = require('path');
var history = require('connect-history-api-fallback');

var app = express();

var staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.set('port',process.env.PORT||5000);

app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

app.listen(app.get('port'), function () {
    console.log("App now running on port", app.get('port'));
});


app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'));
});

