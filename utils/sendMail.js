import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, text) => {
    

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      });

    const mailOptions = {
        from: `${process.env.MAIL_USER}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    };

    await transport.sendMail(mailOptions);
};


