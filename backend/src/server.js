import "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5001;

await connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
