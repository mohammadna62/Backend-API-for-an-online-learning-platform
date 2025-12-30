const ticketModel = require("./../../models/ticket");
const departmentModel = require("./../../models/department");
const departmentSubModel = require("./../../models/department-sub");

exports.create = async (req, res) => {};

exports.getAll = async (req, res) => {};

exports.remove = async (req, res) => {};

exports.userTickets = async (req, res) => {};

exports.departments = async (req, res) => {
    const departments = await departmentModel.find({})
    return res.status(200).json(departments)
};

exports.departmentsSubs = async (req, res) => {
    const {id}= req.params
if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(409).json({message: " the Id is not valid"})
}
    const departmentSubs = await departmentSubModel.find({parent:id}).lean()
    return res.status(200).json(departmentSubs)
};

exports.setAnswer = async (req, res) => {};

exports.getAnswer = async (req, res) => {};




