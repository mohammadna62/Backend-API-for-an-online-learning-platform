const nodemailer = require("nodemailer");
const contactModel = require("./../../models/contact");
const emailValidation = require("./../../validators/email");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({});
  return res.status(200).json(contacts);
};
exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;
  const emailValidator = emailValidation({ email });

  if (emailValidator !== true) {
    return res.status(422).json(emailValidator);
  }
  const contact = await contactModel.create({
    name,
    email,
    phone,
    body,
    answer: 0,
  });
  return res.status(201).json(contact);
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(409).json({ message: "contact Id is not valid" });
  }
  const deleteContact = await contactModel.findOneAndDelete({ _id: id });
  if (!deleteContact) {
    return res.status(404).json({ message: "contact not found" });
  }
  return res.status(201).json({ message: "contact deleted", deleteContact });
};
exports.answer = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adorable.creaturee@gmail.com",
      pass: "lxno cqky yssx jjtr",
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "Email From Mohammad Naghavi ",
    text: req.body.answer,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(422).json({ message: error });
    } else {
      const contact = await contactModel.findOneAndUpdate(
        { email: req.body.email },
        { answer: 1 }
      );
      return res.status(200).json({ message: "Email sent successfully" });
    }
  });
};
