import Schedule from "../models/Schedule.js";
import Enrollment from "../models/Enrollment.js";
import Teacher from "../models/Teacher.js";
import Classroom from "../models/Classroom.js";
import TimeSlot from "../models/TimeSlot.js";
import { generateBasicSchedule } from "./csp.service.js";

export const scheduleService = {
  list: () => Schedule.find().sort({ createdAt: -1 }),

  getById: (id) =>
    Schedule.findById(id)
      .populate("assignments.course")
      .populate("assignments.teacher")
      .populate("assignments.classroom")
      .populate("assignments.timeSlot")
      .populate("assignments.students"),

  generate: async (period = "2026-1") => {
    const enrollments = await Enrollment.find({ status: "CONFIRMED" })
      .populate("student")
      .populate("courses");
    const teachers = await Teacher.find({ active: true }).populate("availableCourses");
    const classrooms = await Classroom.find({ active: true });
    const timeSlots = await TimeSlot.find({ active: true });

    const { assignments, conflicts, status } = generateBasicSchedule({
      enrollments,
      teachers,
      classrooms,
      timeSlots,
    });

    const schedule = await Schedule.create({
      period,
      assignments,
      conflicts,
      status,
      generatedAt: new Date(),
    });

    return schedule.populate([
      { path: "assignments.course" },
      { path: "assignments.teacher" },
      { path: "assignments.classroom" },
      { path: "assignments.timeSlot" },
    ]);
  },

  byStudent: async (studentId) => {
    const schedules = await Schedule.find({
      "assignments.students": studentId,
    })
      .populate("assignments.course")
      .populate("assignments.teacher")
      .populate("assignments.classroom")
      .populate("assignments.timeSlot")
      .sort({ createdAt: -1 });
    return schedules.flatMap((s) =>
      s.assignments.filter((a) =>
        a.students.some((st) => String(st) === String(studentId))
      )
    );
  },

  byTeacher: async (teacherId) => {
    const schedules = await Schedule.find({
      "assignments.teacher": teacherId,
    })
      .populate("assignments.course")
      .populate("assignments.classroom")
      .populate("assignments.timeSlot")
      .sort({ createdAt: -1 });
    return schedules.flatMap((s) =>
      s.assignments.filter((a) => String(a.teacher._id || a.teacher) === String(teacherId))
    );
  },

  byClassroom: async (classroomId) => {
    const schedules = await Schedule.find({
      "assignments.classroom": classroomId,
    })
      .populate("assignments.course")
      .populate("assignments.teacher")
      .populate("assignments.timeSlot")
      .sort({ createdAt: -1 });
    return schedules.flatMap((s) =>
      s.assignments.filter(
        (a) => String(a.classroom._id || a.classroom) === String(classroomId)
      )
    );
  },
};
