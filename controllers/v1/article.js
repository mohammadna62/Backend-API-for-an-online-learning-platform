const articleModel = require("./../../models/article");

exports.getAll = async (req, res) => {
  const articles = await articleModel.find({ publish: 1 }).populate("creator" ,"name").populate("categoryID");
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
exports.getOne = async (req, res) => {
  const {href}= req.params
  const articles = await articleModel.find({href:req.params.href,publish:1}).lean()
  
  if(articles.length===0){
    return res.status(404).json({message: "there is not any article with this subject"})
  }else{
    
    return res.status(200).json(articles)
  }
};

exports.remove = async (req, res) => {

};

exports.saveDraft = async (req, res) => {};

exports.getAllByAdmin = async (req, res) => {
  const articles = await articleModel.find({}).populate("creator" ,"name").populate("categoryID");
  if (!articles) {
    return res
      .status(409)
      .json({ message: "there is not any published article" });
  }
  return res.status(200).json(articles);
};

exports.publish = async (req, res) => {};
