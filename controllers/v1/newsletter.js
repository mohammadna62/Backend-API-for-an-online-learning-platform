const newsletterModel = require("./../../models/newsletter");
const emailValidation = require("./../../validators/email")

exports.getAll = async (req, res) => {
  const newsletters = await newsletterModel.find();
  return res.json(newsletters);
};

exports.create = async (req, res) => {
  const { email } = req.body;

 const emailValidator = emailValidation({email})

 if (emailValidator !== true){
    return res.status(422).json(emailValidator)
 }

  const newEmail = await newsletterModel.create({ email });
  return res.json(newEmail);
};
