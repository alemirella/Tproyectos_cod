import { useEffect, useState } from "react";
import { timeslotService } from "../../services/timeslotService.js";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export default function TimeSlotsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ day: "MONDAY", startTime: "07:00", endTime: "09:00", label: "" });

  const load = () => timeslotService.list().then(setItems);
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    await timeslotService.create({
      ...form,
      label: form.label || `${form.day} ${form.startTime}-${form.endTime}`,
    });
    load();
  }

  return (
    <>
      <div className="page-header"><h2>Franjas horarias</h2></div>
      <div className="card">
        <form onSubmit={save} className="form-grid">
          <div className="form-group"><label>Día</label><select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>{DAYS.map((d) => <option key={d}>{d}</option>)}</select></div>
          <div className="form-group"><label>Inicio</label><input value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} /></div>
          <div className="form-group"><label>Fin</label><input value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} /></div>
          <button type="submit" className="btn">Crear franja</button>
        </form>
      </div>
      <table><thead><tr><th>Día</th><th>Inicio</th><th>Fin</th><th>Etiqueta</th></tr></thead>
        <tbody>{items.map((t) => <tr key={t._id}><td>{t.day}</td><td>{t.startTime}</td><td>{t.endTime}</td><td>{t.label}</td></tr>)}</tbody>
      </table>
    </>
  );
}
