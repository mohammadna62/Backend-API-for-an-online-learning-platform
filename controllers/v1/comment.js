const mongoose = require ('mongoose')
const commentModel = require("./../../models/comment");
const courseModel = require("./../../models/course");

exports.create = async (req, res) => {
  const { body, courseHref, score } = req.body;

  const course = await courseModel.findOne({ href: courseHref }).lean();
  if (!course){
    return res.status(404).json({message:" this course is not available"})
  }
  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
    score,
    isAnswer: 0,
    isAccept: 0,
  });
  return res.status(201).json(comment)
};
exports.remove = async (req , res)=>{
  const {id}= req.params
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid){
    return res.status(409).json({message : "comment ID is not valid"})
  }
  const deletedComment = await commentModel.findOneAndDelete({_id :id})
  if (!deletedComment){
   return res.status(404).json({message:"comment not found"})
  }
    return res.status(200).json(deletedComment)
}
exports.accept = async (req , res)=>{
    const {id}= req.params
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid){
    return res.status(409).json({message : "comment ID is not valid"})
  }
  const acceptedComment = await commentModel.findOneAndUpdate({_id : id}, {isAccept:1})
   if (!acceptedComment){
   return res.status(404).json({message:"comment not found"})
  }
  return res.status(200).json({message : " comment accepted"})

}
exports.reject = async (req , res)=>{
    const {id}= req.params
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid){
    return res.status(409).json({message : "comment ID is not valid"})
  }
  const rejectedComment = await commentModel.findOneAndUpdate({_id : id}, {isAccept:0})
   if (!rejectedComment){
   return res.status(404).json({message:"comment not found"})
  }
  return res.status(200).json({message : " comment rejected"})
}
 