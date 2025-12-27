const contactModel = require("./../../models/contact");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({});
  return res.status(200).json(contacts);
};
exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;
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
  if(!isValid){
    return res.status(409).json({message:"contact Id is not valid"})
  }
  const deleteContact = await contactModel.findOneAndDelete({_id:id})
  if(!deleteContact){
    return res.status(404).json({message:"contact not found"})
  }
  return res.status(201).json({message: "contact deleted" ,deleteContact})
};
exports.answer = async (req, res) => {};
