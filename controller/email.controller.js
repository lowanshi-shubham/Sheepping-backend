import nodemailer from "nodemailer";

function sendMail(email, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shubhamlowanshi12345@gmail.com",
      pass: "tjpf sbul onfa ofor", // app password
    },
  });

  const verifyLink = `http://localhost:5173/verify/${email}`;

  const mailOptions = {
    from: "Shipping War <shubhamlowanshi12345@gmail.com>",
    to: email,
    subject: "Verification Email - Shipping War",
    html: `
      <h1>Welcome to Shipping War</h1>

      <p>You have successfully registered to our site. Your login credentials are below:</p>

      <p><b>Username:</b> ${email}</p>
      <p><b>Password:</b> ${password}</p>

      <h3>Click on the link below to verify your account</h3>

      <a 
        href="${verifyLink}" 
        style="
          display:inline-block;
          padding:12px 20px;
          background:#0d6efd;
          color:white;
          text-decoration:none;
          border-radius:5px;
        "
      >
        Click to Verify
      </a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Mail error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

export default sendMail;
