const courseUserModel = require("./../../models/course-user");

exports.getAll = async (req, res) => {
  const orders = await courseUserModel
    .find({ user: req.user._id })
    .populate("course","name href").populate("user","name").lean();
  return res.status(200).json(orders);
};

exports.getOne = async (req, res) => {
    
};
