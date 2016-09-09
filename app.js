var express = require("express");
var cors = require("cors"); 
var bodyParser = require("body-parser"); 
var app = express();
var request = require('request');

var options = {
  url: 'https://chronicdata.cdc.gov/api/views/g4ie-h725/rows.json?accessType=DOWNLOAD',
  
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.meta.view.columns[1].id + " Stars");
  //  console.log(info.forks_count + " Forks");
  }
}

request(options, callback);

var url="https://api.github.com/users/hackeryou"


var healthyItems = [ 
{
    item: "asdf", 
    info: "get 7-8 hours"
}, 
{
    item: "water", 
    info: "Drink a large glass of ice water with lemon every morning"
}, 
{
    item: "learn", 
    info: "learn something and apply it every day"
}
]; 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.use(express.static("./public"));

app.use(cors()); 

app.get("/dictionary-api", function(req, res) {
    res.json(healthyItems); 


});  

app.post("/dictionary-api", function(req, res) {

    healthyItems.push(req.body); 
    res.json(healthyItems); 

}); 

app.delete("/dictionary-api/:item", function(req, res) {

    healthyItems = healthyItems.filter(function(definition) {
        return definition.item.toLowerCase() !== req.params.item.toLowerCase(); 


    }); 

    res.json(healthyItems); 

})


app.set('port', (process.env.PORT || 3000));

console.log("Express app running on port 3000");

module.exports = app;

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
