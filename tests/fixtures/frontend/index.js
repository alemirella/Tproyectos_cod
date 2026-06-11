const API = "http://localhost:5001/api";

export const mockAdmin = {
  id: "admin-1",
  name: "Admin Demo",
  email: "admin@sgoha.edu",
  role: "ADMIN",
};

export const mockTeacher = {
  id: "teacher-1",
  name: "Docente Demo",
  email: "docente@sgoha.edu",
  role: "TEACHER",
};

export const mockStudent = {
  id: "student-1",
  name: "Alumno Demo",
  email: "alumno@sgoha.edu",
  role: "STUDENT",
};

export const mockCourses = [
  {
    _id: "c1",
    code: "CS101",
    name: "Programación I",
    credits: 4,
    classroomTypeRequired: "STANDARD",
    active: true,
  },
];

export { API };
