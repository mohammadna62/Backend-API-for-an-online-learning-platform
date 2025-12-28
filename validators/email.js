const Validator = require("fastest-validator");

const v = new Validator();

const schema = {

  email: { type: "email", min: 4, max: 100 },
  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
