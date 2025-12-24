const mongoose = require("mongoose");
const courseModel = require("./../../models/course");
const categoryModel = require("./../../models/category");
const sessionModel = require("./../../models/session");
const commentsModel = require("./../../models/comment");
const courseUserModel = require("./../../models/course-user");
const isAdmin = require("../../middlewares/isAdmin");
const { answer } = require("./comment");

exports.create = async (req, res) => {
  const {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    creator: req.user._id,
    categoryID,
    support,
    price,
    href,
    status,
    discount,
    cover: req.file.filename,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};
exports.getOne = async (req, res) => {
  const course = await courseModel
    .findOne({ href: req.params.href })
    .populate("creator", "-password")
    .populate("categoryID");

  const sessions = await sessionModel.find({ course: course._id }).lean();
  const comments = await commentsModel
    .find({ course: course._id, isAccept: 1 })
    .populate("creator", "-password")
    .populate("course")
    .lean();
  const courseStudentsCount = await courseUserModel
    .find({ course: course._id })
    .countDocuments();
  const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
    user: req.user._id,
    course: course._id,
  }));

  let allComments = [];
  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) == String(answerComment.mainCommentID)) {
        allComments.push({
          ...comment,
          course: comment.course.name,
          creator: comment.creator.name,
          answerComment,
        });
      }
    });
  });

  res.json({
    course,
    sessions,
    comments: allComments,
    courseStudentsCount,
    isUserRegisteredToThisCourse,
  });
};
exports.createSession = async (req, res) => {
  const { title, free, time } = req.body;
  const { id } = req.params;

  const session = await sessionModel.create({
    title,
    time,
    free,
    video: "Video.mp4", // req.file.filename
    course: id,
  });

  return res.status(201).json(session);
};

exports.getAllSessions = async (req, res) => {
  const sessions = await sessionModel
    .find({})
    .populate("course", "name")
    .lean();

  return res.json(sessions);
};

exports.getSessionInfo = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href }).lean();
  const session = await sessionModel.findOne({ _id: req.params.sessionID });
  const sessions = await sessionModel.find({ course: course._id });
  return res.json({ session, sessions });
};

exports.removeSession = async (req, res) => {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(409).json({ message: " course id is not valid" });
  }
  const deleteCourse = await sessionModel.findByIdAndDelete({ _id: id });
  if (!deleteCourse) {
    return res.status(404).json({ message: "course not found" });
  }
  return res.status(200).json(deleteCourse);
};

exports.register = async (req, res) => {
  const isUserAlreadyRegistered = await courseUserModel
    .findOne({
      user: req.user._id,
      course: req.params.id,
    })
    .lean();
  if (isUserAlreadyRegistered) {
    return res
      .status(409)
      .json({ message: "user Already registered  in this course" });
  }
  const register = await courseUserModel.create({
    user: req.user._id,
    course: req.params.id,
    price: req.body.price,
  });
  return res.status(201).json({ message: "you are registered " });
};
exports.getCoursesByCategory = async (req, res) => {
  const category = await categoryModel
    .findOne({ href: req.params.href })
    .lean();
  if (category) {
    const courses = await courseModel.find({ categoryID: category._id }).lean();
    return res.status(200).json(courses);
  } else {
    return res.status(404).json({ message: " category not found" });
  }
};

exports.remove = async (req, res) => {
  const isObjectIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isObjectIdValid) {
    return res.status(409).json({
      message: "course id is not valid",
    });
  }
  const deletedCourse = await courseModel.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deletedCourse) {
    return res.status(404).json({
      message: "course not found",
    });
  }
  return res.json(deletedCourse);
};

exports.getRelated = async (req, res) => {
  const { href } = req.params;
  const course = await courseModel.findOne({ href });
  if (!course) {
    return res.status(404).json({ message: " Course Not Found" });
  }
  let relatedCourses = await courseModel.find({
    categoryID: course.categoryID,
  });

  relatedCourses = relatedCourses.filter((course) => course.href !== href);
  return res.status(200).json(relatedCourses);
};

exports.popular = async (req, res) => {
  let coursesTitle = [];
  let courseCountOfTitle = {};
  const courses = await courseModel.find({});

  courses.forEach((course) => {
    coursesTitle.push(course.href);
    courseCountOfTitle[course.href] = null;
  });

  for (const name of coursesTitle) {
    const courseId = await courseModel.findOne({ href: name });
    const countOfCourseRegistered = await courseUserModel.countDocuments({
      course: courseId._id,
    });
    courseCountOfTitle[name] = countOfCourseRegistered;
  }

  return res.json(courseCountOfTitle);
};
exports.presell = async (req, res) => {
  const presell = await courseModel.find({ status: "پیش فروش" }).lean();
  return res.status(200).json(presell);
};
