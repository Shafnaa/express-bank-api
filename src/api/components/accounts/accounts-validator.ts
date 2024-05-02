import joi from "joi";

const accountValidator = {
  createAccount: {
    body: {
      name: joi.string().min(1).max(100).required().label("Name"),
      balance: joi.number().min(0).required().label("Amount"),
    },
  },

  updateAccount: {
    body: {
      name: joi.string().min(1).max(100).required().label("Name"),
    },
  },
};
export default accountValidator;
