const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../utils');

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, 'Email already in use');

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
