const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../utils');

const { BASE_URL } = process.env;

const resendVarifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) HttpError(401, 'Email was not found');
  if (user.verify) HttpError(401, 'Verification has already been passed');

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationCode}" target="_blank">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: 'Verification email sent' });
};

module.exports = resendVarifyEmail;
