import Student from "../models/Student.js";

export const studentService = {
  list: () => Student.find().populate("approvedCourses").sort({ code: 1 }),
  getById: (id) => Student.findById(id).populate("approvedCourses"),
  create: (data) => Student.create(data),
  update: (id, data) =>
    Student.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate(
      "approvedCourses"
    ),
  remove: (id) => Student.findByIdAndDelete(id),
  updateApprovedCourses: (id, approvedCourses) =>
    Student.findByIdAndUpdate(
      id,
      { approvedCourses },
      { new: true, runValidators: true }
    ).populate("approvedCourses"),
};
