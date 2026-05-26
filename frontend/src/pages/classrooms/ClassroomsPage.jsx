import { useEffect, useState } from "react";
import { classroomService } from "../../services/classroomService.js";

export default function ClassroomsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ code: "", type: "STANDARD", capacity: "", location: "" });

  const load = () => classroomService.list().then(setItems);
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    await classroomService.create({ ...form, capacity: Number(form.capacity) });
    setForm({ code: "", type: "STANDARD", capacity: "", location: "" });
    load();
  }

  return (
    <>
      <div className="page-header"><h2>Aulas</h2><p>Registro de aulas</p></div>
      <div className="card">
        <form onSubmit={save} className="form-grid">
          <div className="form-group"><label>Código</label><input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required /></div>
          <div className="form-group"><label>Tipo</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>STANDARD</option><option>LAB</option><option>COMPUTER_ROOM</option></select></div>
          <div className="form-group"><label>Capacidad</label><input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required /></div>
          <div className="form-group"><label>Ubicación</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <button type="submit" className="btn">Guardar</button>
        </form>
      </div>
      <table><thead><tr><th>Código</th><th>Tipo</th><th>Capacidad</th><th>Ubicación</th></tr></thead>
        <tbody>{items.map((c) => <tr key={c._id}><td>{c.code}</td><td>{c.type}</td><td>{c.capacity}</td><td>{c.location}</td></tr>)}</tbody>
      </table>
    </>
  );
}
