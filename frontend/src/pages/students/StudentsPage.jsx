import { useEffect, useState } from "react";
import { studentService } from "../../services/studentService.js";

export default function StudentsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ code: "", fullName: "", email: "", program: "" });

  const load = () => studentService.list().then(setItems);
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    await studentService.create(form);
    setForm({ code: "", fullName: "", email: "", program: "" });
    load();
  }

  return (
    <>
      <div className="page-header"><h2>Estudiantes</h2></div>
      <div className="card">
        <form onSubmit={save} className="form-grid">
          <div className="form-group"><label>Código</label><input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required /></div>
          <div className="form-group"><label>Nombre</label><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></div>
          <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="form-group"><label>Programa</label><input value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} /></div>
          <button type="submit" className="btn">Registrar</button>
        </form>
      </div>
      <table><thead><tr><th>Código</th><th>Nombre</th><th>Email</th><th>Programa</th></tr></thead>
        <tbody>{items.map((s) => <tr key={s._id}><td>{s.code}</td><td>{s.fullName}</td><td>{s.email}</td><td>{s.program}</td></tr>)}</tbody>
      </table>
    </>
  );
}
