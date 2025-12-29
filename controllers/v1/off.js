const offModel = require("./../../models/Off");
const courseModel = require ("./../../models/course")

exports.getAll = async (req, res) => {

};

exports.create = async (req, res) => {};
exports.setOnAll = async (req, res) => {
  const { discount } = req.body;

  const coursesDiscounts = await courseModel.updateMany({},{ discount });
  if(!coursesDiscounts){
     return res.status(422).json({ message: "there is a problem" });
  }

  return res.status(200).json({ message: `${discount} Percentage Discount set successfully` });
};

exports.getOne = async (req, res) => {};

exports.remove = async (req, res) => {};
