const { default: mongoose } = require("mongoose");
const categoryModel = require("./../../models/category");
const categoryValidator = require("./../../validators/categoryValidator");
exports.create = async (req, res) => {
  const validationResult = categoryValidator(req.body);
  if (validationResult != true) {
    return res.status(422).json(validationResult);
  }
  const { title, href } = req.body;
  const category = await categoryModel.create({ title, href });

  return res.status(201).json(category);
};
exports.getAll = async (req, res) => {
  const categories = await categoryModel.find({});
  return res.json(categories);
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id)
  if (!isValidId) {
    return res.status(409).json({message:"category id is not valid"});
  }
  const removedCategory = await categoryModel.findByIdAndDelete({ _id: id });
  return res.status(200).json(removedCategory);
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const isValid = await mongoose.Types.ObjectId.isValid(id)
  if(!isValid){
    return res.status(409).json({message:"category id is not valid"})
  }
    const validationResult = categoryValidator(req.body);
  if (validationResult != true) {
    return res.status(422).json(validationResult);
  }
  const { title, href } = req.body;
  const updatedCategory = await categoryModel.findByIdAndUpdate(
    {  _id :id },
    {
      $set: {
        title,
        href,
      },
    }
  );
  if(!updatedCategory){
    return res.status(404).json({message : " category not found"})
  }
   return res.status(200).json(category)
};
