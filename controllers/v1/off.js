const offModel = require("./../../models/Off");
const courseModel = require("./../../models/course");
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  const offs = await offModel
    .find({}, "-__v")
    .populate("course", "name href")
    .populate("creator", "name");
  return res.status(200).json(offs);
};

exports.create = async (req, res) => {
  const { code, percent, course, max } = req.body;
  const newOff = await offModel.create({
    code,
    percent,
    course,
    max,
    creator: req.user._id,
    uses: 0,
  });
  return res.status(201).json(newOff);
};
exports.setOnAll = async (req, res) => {
  const { discount } = req.body;

  const coursesDiscounts = await courseModel.updateMany({}, { discount });
  if (!coursesDiscounts) {
    return res.status(422).json({ message: "there is a problem" });
  }

  return res
    .status(200)
    .json({ message: `${discount} Percentage Discount set successfully` });
};

exports.getOne = async (req, res) => {};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(209).json({ message: "discount ID is not valid" });
  }
  const deleteDiscount = await offModel.findOneAndDelete({ _id: id });
  return res.status(200).json(deleteDiscount);
};
