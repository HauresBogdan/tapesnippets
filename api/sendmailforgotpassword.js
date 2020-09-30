const nodemailer = require('nodemailer');
//const jwt = require('jsonwebtoken');

module.exports = async function main(token,emailadress) { 

  //const dev_uri = "http://localhost:3000";
  const prod_uri = "https://tapesnippets.com";
    
    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
              user: process.env.MAIL_USER, 
              pass: process.env.MAIL_PASS  
            },
          });

          //const token = props;
          //const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"TapeSnippets 🎞️" <TapeSnippets@gmail.com>', // sender address
            //to: "bar@example.com, hauresbogdan@gmail.com", // list of receivers
            to: emailadress, // only one reciver
            subject: "Confirm your email adress by clicking here:", // Subject line
            text: "Confirm your email adress by clicking here:", // plain text body

            //send token witch has the email adress that needs confirming in verified.email adress

            //change this to heroku or tapesnippets.com from localhost on deplyment
            html: `<b>Change your password link:<a href='${prod_uri}/forgotpassword/${token}'>TapeSnippets</a></b><br/><p>If you didn't send this email please ignore this message.</p>`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);  
        
    } catch (error) {
        console.log(error);
    }  
    
  }
  
  