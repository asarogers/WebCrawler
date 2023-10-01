var nodemailer = require('nodemailer');

async  function sendEmail(req, res){
    const {email, subject, body, password, myEmail, position} = req.body;
    //console.log("my email " + myEmail + " password " + password)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: myEmail,
          pass: password
        }
      });
    

      var mailOptions = {
        from: myEmail,
        to: email,
        subject: subject,
        text: body
      };

      console.log("position=", position)
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send("err")
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Email sent")
        }
      }); 


    //var postmark = require("postmark");
   // Send an email:
// var client = new postmark.ServerClient("ea6dad09-b88a-4362-9eb0-6a4e123cbc27");
// client.sendEmail({
//   "From": myEmail,
//   "To": myEmail,
//   "Subject": subject,
//   "TextBody": body
// });




}

module.exports = {sendEmail: sendEmail}


