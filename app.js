var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){

  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: first_name,
          LNAME: last_name
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  //replace with your data
  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/your_list_id",
    method: "POST",
    headers : {
      "Authorization": "string api_key-usx"
    },
    body: jsonData
  };


  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    }else{
      if (response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server ir running on port 3000");
});
