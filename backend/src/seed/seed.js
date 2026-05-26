import "../config/env.js";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Teacher from "../models/Teacher.js";
import Classroom from "../models/Classroom.js";
import Student from "../models/Student.js";
import TimeSlot from "../models/TimeSlot.js";
import { DAYS } from "../utils/constants.js";

const SLOTS = [
  ["07:00", "09:00"],
  ["09:00", "11:00"],
  ["11:00", "13:00"],
  ["15:00", "17:00"],
  ["17:00", "19:00"],
  ["19:00", "21:00"],
];

await connectDB();

await Promise.all([
  User.deleteMany({}),
  Course.deleteMany({}),
  Teacher.deleteMany({}),
  Classroom.deleteMany({}),
  Student.deleteMany({}),
  TimeSlot.deleteMany({}),
]);

const admin = await User.create({
  name: "Administrador SGOHA",
  email: "admin@sgoha.local",
  password: "admin123",
  role: "ADMIN",
});

const c1 = await Course.create({
  code: "CS101",
  name: "Introducción a la Programación",
  credits: 4,
  classroomTypeRequired: "COMPUTER_ROOM",
  prerequisites: [],
});

const c2 = await Course.create({
  code: "MA201",
  name: "Cálculo Diferencial",
  credits: 5,
  classroomTypeRequired: "STANDARD",
  prerequisites: [],
});

await Teacher.create({
  fullName: "Ana García",
  email: "ana.garcia@sgoha.local",
  specialty: "Informática",
  availableCourses: [c1._id],
  availability: DAYS.slice(0, 5).flatMap((day) =>
    SLOTS.map(([startTime, endTime]) => ({ day, startTime, endTime }))
  ),
});

await Classroom.create([
  { code: "A-101", type: "STANDARD", capacity: 40, location: "Bloque A" },
  { code: "LAB-1", type: "COMPUTER_ROOM", capacity: 30, location: "Bloque B" },
]);

await Student.create({
  code: "EST001",
  fullName: "Juan Pérez",
  email: "juan.perez@sgoha.local",
  program: "Ingeniería de Sistemas",
  approvedCourses: [c2._id],
});

for (const day of DAYS) {
  for (const [startTime, endTime] of SLOTS) {
    await TimeSlot.create({
      day,
      startTime,
      endTime,
      label: `${day} ${startTime}-${endTime}`,
      active: true,
    });
  }
}

console.log("Seed completado.");
console.log("Login:", admin.email, "/ admin123");
process.exit(0);
