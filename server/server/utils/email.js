const nodemailer = require("nodemailer");

//  with nodemailer - still in development****
// Create a transporter
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: process.env.EMAIL_USERNAME,
      // pass: process.env.EMAIL_PASSWORD,
      user: "piaobristar@gmail.com",
      pass: "beabigmanintheworld",
    },
  });

  // Define the email option
  const mailOptions = {
    // from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    from: `mingxingwang <piaobristar@gmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  console.log(mailOptions);
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  // await transporter.sendMail(mailOptions, async (err, info) => {
  //   if (err) return false;
  //   else return true;
  // });
  // console.log("this is for check async");
};

export { sendEmail };
