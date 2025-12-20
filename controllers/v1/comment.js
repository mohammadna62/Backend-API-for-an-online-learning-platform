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
