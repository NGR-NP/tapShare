const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_APP_PASSWORD, BASE_URL } = require("../config/secrets");
const ejs = require('ejs');
const path = require("path");


const sendEmail = async (options) => {
  try {
    const html = await ejs.renderFile(path.join('views', 'FileShared_email_template.ejs'), {
      sharedFileLinks: options?.sharedFileLinks,
      STYLE: `${BASE_URL}emailTemplateStyle.css`

    });
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: EMAIL,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "tapshare<tapsharesite@gmail.com>",
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    // console.error(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

module.exports = sendEmail;
