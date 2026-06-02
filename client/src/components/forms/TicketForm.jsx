import { useEffect, useState } from "react";

function TicketForm({ initialData = null, categorias = [], onSubmit }) {
  const [form, setForm] = useState({
    categoria_id: "",
    titulo: "",
    descripcion: "",
    prioridad: "Media",
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      categoria_id: initialData.categoria_id ?? "",
      titulo: initialData.titulo ?? "",
      descripcion: initialData.descripcion ?? "",
      prioridad: initialData.prioridad ?? "Media",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Categoría</label>

        <select
          name="categoria_id"
          value={form.categoria_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>

          {categorias.map((c) => (
            <option key={c.CATEGORIA_ID} value={c.CATEGORIA_ID}>
              {c.NOMBRE}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Título</label>

        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Descripción</label>

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Prioridad</label>

        <select name="prioridad" value={form.prioridad} onChange={handleChange}>
          <option value="Baja">Baja</option>

          <option value="Media">Media</option>

          <option value="Alta">Alta</option>
        </select>
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}

export default TicketForm;
