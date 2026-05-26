import Classroom from "../models/Classroom.js";

export const classroomService = {
  list: () => Classroom.find().sort({ code: 1 }),
  getById: (id) => Classroom.findById(id),
  create: (data) => Classroom.create(data),
  update: (id, data) =>
    Classroom.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  remove: (id) => Classroom.findByIdAndDelete(id),
};
