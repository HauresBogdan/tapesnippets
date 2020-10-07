const Joi = require("@hapi/joi");

//validation register schema
const register = param => {
  const registerSchema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    email: Joi.string()
      .min(8)
      .max(100)
      .email()
      .required(),

    password: Joi.string()
      .min(8)
      .max(100)
      .required()
  });
  return registerSchema.validate(param);
};

//validation login schema
const login = param => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .min(8)
      .max(100)
      .email()
      .required(),

    password: Joi.string()
      .max(100)
      .required()
  });
  return loginSchema.validate(param);
};

//validation profile schema
const profile = param => {
  const profileSchema = Joi.object({
   
    friends: Joi.string(),

    bio: Joi.string()
      .min(8)
      .max(5000),

    watchlater: Joi.string(),

    lists: {
      title: Joi.string()
    },
    trash: Joi.string(),

    social: {
      youtube: Joi.string()
        .min(3)
        .max(50),

      facebook: Joi.string()
        .min(3)
        .max(50),

      website: Joi.string()
        .min(3)
        .max(50),

      instagram: Joi.string()
        .min(3)
        .max(50),

      twitter: Joi.string()
        .min(3)
        .max(50),
      linkedin: Joi.string()
        .min(3)
        .max(50)
    }
  });
  return profileSchema.validate(param);
};

//validation login schema
const newPassword2 = param => {
  const newPasswordSchema = Joi.object({    
    password: Joi.string()
      .min(8)
      .max(100)
      .required()
  });
  return newPasswordSchema.validate(param);
};

module.exports.register = register;
module.exports.login = login;
module.exports.newPassword2 = newPassword2;
module.exports.profile = profile;
