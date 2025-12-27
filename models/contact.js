const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  answe: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Contact", schema);
module.exports = model;
