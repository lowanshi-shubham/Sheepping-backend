import nodemailer from "nodemailer";
import { Link } from 'react-router-dom'

function sendMail(email, password) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shubhamlowanshi12345@gmail.com",
      pass: "tjpf sbul onfa ofor",
    },
  });

  var mailOptions = {
    from:"Shiping War",
    to: email,
    subject: "Verification Email Shipping War",
    html:
      "<h1>Welcome to Shipping War</h1><p>You have successfully registered to our site , your login credentials are attached below</p><h2>Username : " +
      email +
      "</h2><h2>Password : " +
      password +
      "</h2><h1>Click on the link below to verify account</h1> <Link to='http://localhost:5173/verify/" +
      email +
      "'> Click to verify....</Link>", 

//       `
//   <h1>Welcome to Shipping War</h1>
//   <p>You have successfully registered to our site. Your login credentials are below:</p>
//   <h2>Username: ${email}</h2>
//   <h2>Password: ${password}</h2>
//   <p><strong>Click below to verify your account:</strong></p>
//   <a href="http://localhost:5173/verify/${email}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Click to verify...</a>
//   <p>If the button doesn't work, copy and paste this URL into your browser:</p>
//   <p>http://localhost:5173/verify/${email}</p>
// `

// <a href='http://localhost:5173/verify/" +
//       email +
//       "'>
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendMail;
