var express = require("express");
var cors = require("cors"); 
var bodyParser = require("body-parser"); 
var app = express();


var healthyItems = [ 
{
    item: "sleep", 
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



module.exports = app;

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
