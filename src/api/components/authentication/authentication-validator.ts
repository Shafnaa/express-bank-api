import joi from "joi";

const authenticationValidator = {
  login: {
    body: {
      email: joi.string().email().required().label("Email"),
      password: joi.string().required().label("Password"),
    },
  },
};

export default authenticationValidator;
