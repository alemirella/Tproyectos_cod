/**
 * Seed solo de usuarios para pruebas de login.
 * Ejecutar: npm run seed
 */
import "../config/env.js";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const USERS = [
  {
    name: "Administrador SGOHA",
    email: "admin@sgoha.edu",
    password: "123456",
    role: "ADMIN",
  },
  {
    name: "Docente Demo",
    email: "docente@sgoha.edu",
    password: "123456",
    role: "TEACHER",
  },
  {
    name: "Alumno Demo",
    email: "alumno@sgoha.edu",
    password: "123456",
    role: "STUDENT",
  },
];

await connectDB();

for (const data of USERS) {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    existing.name = data.name;
    existing.role = data.role;
    existing.active = true;
    existing.password = data.password;
    await existing.save();
    console.log(`Usuario actualizado: ${data.email} (${data.role})`);
  } else {
    await User.create(data);
    console.log(`Usuario creado: ${data.email} (${data.role})`);
  }
}

console.log("\nCredenciales de prueba (contraseña: 123456):");
USERS.forEach((u) => console.log(`  - ${u.email} → ${u.role}`));

process.exit(0);
