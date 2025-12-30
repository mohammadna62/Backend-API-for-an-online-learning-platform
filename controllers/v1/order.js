const courseUserModel = require("./../../models/course-user");
const mongoose = require("mongoose")

exports.getAll = async (req, res) => {
  const orders = await courseUserModel
    .find({ user: req.user._id })
    .populate("course","name href").populate("user","name").lean();
  return res.status(200).json(orders);
};

exports.getOne = async (req, res) => {
    const {id}= req.params
if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(409).json({message: " the article Id is not valid"})
}
    const order = await courseUserModel.findOne({_id:id}).populate("course")
    return res.status(200).json(order)

};
