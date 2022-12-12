const express =require("express");
const bodyParser= require("body-parser");
const request=require("request")
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get( "/", function(req,res){

res.sendFile(__dirname +"/signUp.html")
});

app.post("/", function(req,res){

   var firstName= req.body.fname;
   var lastName=req.body.lname;
   var email =req.body.email;



client.setConfig({
  apiKey: "ab2ecec261fb48ab3cc801717ef7b4bb-us14",
  server: "us14"
});

const run = async () => {
  const response = await client.lists.batchListMembers("d8eff9914a", {
    members: [{
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,

        LNAME:lastName
      }
    }],
  });

  if (response.status === 202) {
    res.send(__dirname + "/sucess.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  }
  console.log(response);
};

run();



 })

app.listen(3000,function(){
  console.log("here is holy")
})

//
// ab2ecec261fb48ab3cc801717ef7b4bb-us14

 // d8eff9914a
