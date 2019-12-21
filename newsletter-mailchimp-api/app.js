const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const path = require("path"); // In Core Node.js


const app = express();

// Bodyparser middleware - it will take this line so bodyparser can take form data
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public'))); // __dirname = current folder, this will load all the files in public. Ex: /success.html etc will also work

// Signup ROUTE for Signup
app.post('/signup', (req, res) => {
  console.log(req.body); // This will show the form data in JSON format.
  // res.send("Hello"); // This will respond with "Hello" in browser - just text
  
  const { firstName, lastName, email } = req.body;
  
  // Make sure fields are filled
  if(!firstName || !lastName || !email){
    res.redirect('/fail.html');
    return;
  }
  
  
  // Construct req data, it must be like https://developer.mailchimp.com/documentation/mailchimp/reference/lists/
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  
  const postData = JSON.stringify(data);
  
  // Mailchimp API request
  const myHeaders = {
    'Authorization': 'auth <api_key>'
  };
  
  
  // Docs - https://developer.mailchimp.com/documentation/mailchimp/reference/overview/
  // <dc> is datacenter - see url of Mailchimp dashboard
  // list_id will be in settings of list in GUI
  fetch("https://<dc>.api.mailchimp.com/3.0/lists/{list_id}", { method: 'POST', headers: myHeaders, body: postData })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      if(body.statusCode === 200){
        res.redirect('/success.html');
      }
      else{
        res.redirect('/fail.html');
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/fail.html');
    });
});


const PORT = process.env.PORT || 3002;

app.listen(PORT, console.log(`Server started on ${PORT}`));