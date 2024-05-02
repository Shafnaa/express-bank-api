import joi from "joi";

const typeValidator = {
  createType: {
    body: {
      name: joi.string().min(1).max(100).required().label("Name"),
    },
  },

  updateType: {
    body: {
      name: joi.string().min(1).max(100).required().label("Name"),
    },
  },
};
export default typeValidator;
