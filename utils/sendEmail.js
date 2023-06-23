const nodemailer = require('nodemailer');

const { META_PASSWORD } = process.env;

const nodemailderConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'mariia_kovalova@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailderConfig);

const sendEmail = async data => {
  const email = {
    ...data,
    from: 'mariia_kovalova@meta.ua',
  };
  try {
    await transport.sendMail(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
