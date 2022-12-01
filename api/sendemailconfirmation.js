const nodemailer = require("nodemailer");
const { FE_URL } = require("../FrontEnd/src/components/constants");

module.exports = async function main(token, emailadress) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"TapeSnippets 🎞️" <TapeSnippets@gmail.com>',
      to: emailadress,
      subject: "Confirm your email adress by clicking here:",
      text: "Confirm your email adress by clicking here:",
      html: `<b>Confirm your email adress by clicking here:<a href='${FE_URL.WEB}/confirm/${token}'>TapeSnippets</a></b><br/><p>If you didn't registered to our website please ignore this message.</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
