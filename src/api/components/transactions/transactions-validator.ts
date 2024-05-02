import joi from "joi";

const transactionValidator = {
  createTransaction: {
    body: {
      note: joi.string().min(1).max(100).required().label("Note"),
      amount: joi.number().required().label("Amount"),
      typeId: joi.number().required().label("Type ID"),
      fromAccountId: joi.number().required().label("From Account ID"),
      toAccountId: joi.number().required().label("To Account ID"),
    },
  },

  updateTransaction: {
    body: {
      note: joi.string().min(1).max(100).required().label("note"),
    },
  },
};

export default transactionValidator;
