const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');
const Joi = require('joi');

const subscrptionOptions = ['starter', 'pro', 'business'];
// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      uniqe: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: subscrptionOptions,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      required: true,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: ['', 'Verify code is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscrptionOptions),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscrptionOptions),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = { schemas, User };
