const notificationModel = require("./../../models/notification");
const mongoose = require("mongoose");
exports.create = async (req, res) => {
  const { message, admin } = req.body;
  //Validate
  const notification = await notificationModel.create({
    message,
    admin,
  });
  return res.status(201).json(notification);
};

exports.get = async (req, res) => {
  const { _id } = req.user;
  const adminNotifications = await notificationModel.find({ admin: _id });
  return res.status(200).json(adminNotifications);
};

exports.seen = async (req, res) => {
    const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(209).json({ message: "notification ID is not valid" });
  }  
  const seenNotification = await notificationModel.findOneAndUpdate({_id : id},{seen:1})
   return res.status(201).json(seenNotification);
};
exports.getAll = async (req, res) => {
  const notifications = await notificationModel.find({});
  return res.status(200).json(notifications);
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(209).json({ message: "notification ID is not valid" });
  }
  const DeleteNotification = await notificationModel.findOneAndDelete({
    _id: id,
  });
  return res.status(200).json(DeleteNotification);
};
