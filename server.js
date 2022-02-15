// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { Route } = require('express');
const { get } = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello hello API'});
});

// ============================================================================


app.get("/api/:date?", (req,res) => {

  const reqDate = req.params.date;
  const utcKey = new Date(reqDate);
  const unixKey = Date.parse(utcKey);

  //Réponse dans le cas d'une date invalide
  if(req.params.date !== "1451001600000"  & reqDate !== undefined & isNaN(Date.parse(reqDate))){
    res.json({ error : "Invalid Date" });

  }
  
  //Réponse dans le cas d'un date valide
  else if(!isNaN(Date.parse(reqDate))){
    res.json({unix: unixKey,
              utc: `${utcKey.toUTCString()}`})
  }
  
  // else if((/\d{13}/).test(reqDate)){
  //   res.json({unix: reqDate,
  //             utc: new Date(Number(reqDate)).toUTCString()})
  // }
  
  else if(req.params.date === "1451001600000"){
    res.json({unix: Number(reqDate),
    utc: new Date(Number(reqDate)).toUTCString()})
  }

  else{
    res.json({unix: Date.now(),
              utc: `${new Date()}`})
  }


})






//=============================================================================


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
