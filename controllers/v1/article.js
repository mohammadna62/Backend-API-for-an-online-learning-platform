const articleModel = require("./../../models/article");
const mongoose = require ("mongoose")

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
const {id}= req.params
if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(409).json({message: " the article Id is not valid"})
}
const deleteArticle = await articleModel.findOneAndDelete({_id:id})
return res.status(201).json({message:"article deleted successfully" , deleteArticle})
};

exports.getAllByAdmin = async (req, res) => {
  const articles = await articleModel.find({}).populate("creator" ,"name").populate("categoryID");
  if (!articles) {
    return res
      .status(409)
      .json({ message: "there is not any published article" });
  }
  return res.status(200).json(articles);
};

exports.publish = async (req, res) => {
  const {id}= req.params
if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(409).json({message: " the article Id is not valid"})
}
const publishArticle = await articleModel.findOneAndUpdate({_id:id},{publish:1})
if(!publishArticle){
  return res.status(409).json({message:"article not found"})
}
return res.status(200).json(publishArticle)
};
