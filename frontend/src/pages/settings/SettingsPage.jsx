export default function SettingsPage() {
  return (
    <>
      <div className="page-header">
        <h2>Configuración</h2>
        <p>Parámetros generales del sistema (PMV)</p>
      </div>
      <div className="card">
        <p>API: {import.meta.env.VITE_API_URL || "http://localhost:5000/api"}</p>
        <p>Créditos de matrícula: mínimo 20, máximo 22.</p>
      </div>
    </>
  );
}
