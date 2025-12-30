const articleModel = require("./../../models/article");

exports.getAll = async (req, res) => {
  const articles = await articleModel.find({ publish: 1 });
  if (!articles) {
    return res
      .status(409)
      .json({ message: "there is not any published article" });
  }
  return res.status(200).json(articles);
};

exports.create = async (req, res) => {
  const { title, description, body, href, categoryID } = req.body;

  const article = await articleModel.create({
    title,
    description,
    body,
    cover: req.file.filename,
    href,
    categoryID,
    publish: 0,
    creator: req.user._id,
  });
  return res.status(201).json(article);
};
exports.getOne = async (req, rs) => {};

exports.remove = async (req, rs) => {};

exports.saveDraft = async (req, rs) => {};

exports.getAllByAdmin = async (req, rs) => {
  const articles = await articleModel.find({});
  if (!articles) {
    return res
      .status(409)
      .json({ message: "there is not any published article" });
  }
  return res.status(200).json(articles);
};

exports.publish = async (req, res) => {};
