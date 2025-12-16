const userModel = require("./../../models/user");
const bcrypt = require("bcrypt");
const banUserModel = require("./../../models/ban-phone");
const { default: mongoose } = require("mongoose");

exports.banUser = async (req, res) => {
  const mainUser = await userModel
    .findOne({
      _id: req.params.id,
    })
    .lean();
  const banUserResult = await banUserModel.create({
    phone: mainUser.phone,
  });
  if (banUserResult) {
    return res.status(200).json({ message: "user ban successfully" });
  }
  return res.status(500).json({ message: "Server Error!!" });
};

exports.getAll = async (req, res) => {
  const users = await userModel.find({}).lean();

  return res.json(users);
};

exports.removeUser = async (req, res) => {
  const isValidUserID = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidUserID) {
    return res.status(409).json({ message: " user Id is Not valid" });
  }
  const userId = req.params.id;
  const removedUser = await userModel.findByIdAndDelete({ _id: userId });
  if (!removedUser) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ message: " User deleted successfully" });
};

exports.changeRole = async (req, res) => {
  const { id } = req.body;
  const isValidUserID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidUserID) {
    return res.status(404).json({ message: "user Id is not valid" });
  }
  const user = await userModel.findOne({ _id: id });
  let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: id },
    { role: newRole }
  );
  if (updatedUser) {
    return res.status(200).json({ message: "user role changed" });
  }
};

exports.updateUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await userModel
    .findByIdAndUpdate(
      { _id: req.user._id },
      {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
      }
    )
    .select("-password")
    .lean();

  return res.json(user);
};
