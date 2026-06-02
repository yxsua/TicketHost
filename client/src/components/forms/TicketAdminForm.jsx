import { useEffect, useState } from "react";

import TicketConversationModal from "../../components/TicketConversationModal";

function TicketAdminForm({
  initialData = {},
  categorias = [],
  clientes = [],
  agentes = [],
  onSubmit,
}) {
  const [form, setForm] = useState({
    cliente_id: "",
    agente_id: "",
    categoria_id: "",
    titulo: "",
    descripcion: "",
    prioridad: "Media",
    estado: "Abierto",
  });

  const [conversationOpen, setConversationOpen] = useState(false);

  useEffect(() => {
    setForm({
      cliente_id: initialData?.CLIENTE_ID ?? "",

      agente_id: initialData?.AGENTE_ID ?? "",

      categoria_id: initialData?.CATEGORIA_ID ?? "",

      titulo: initialData?.TITULO ?? "",

      descripcion: initialData?.DESCRIPCION ?? "",

      prioridad: initialData?.PRIORIDAD ?? "Media",

      estado: initialData?.ESTADO ?? "Abierto",
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
        <label>Cliente</label>

        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>

          {clientes.map((cliente) => (
            <option key={cliente.CLIENTE_ID} value={cliente.CLIENTE_ID}>
              {cliente.NOMBRE}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Agente</label>

        <select name="agente_id" value={form.agente_id} onChange={handleChange}>
          <option value="">Sin asignar</option>

          {agentes.map((agente) => (
            <option key={agente.AGENTE_ID} value={agente.AGENTE_ID}>
              {agente.NOMBRE}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Categoría</label>

        <select
          name="categoria_id"
          value={form.categoria_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>

          {categorias.map((categoria) => (
            <option key={categoria.CATEGORIA_ID} value={categoria.CATEGORIA_ID}>
              {categoria.NOMBRE}
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

      <div>
        <label>Estado</label>

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="Abierto">Abierto</option>

          <option value="En Proceso">En Proceso</option>

          <option value="Resuelto">Resuelto</option>

          <option value="Cerrado">Cerrado</option>
        </select>
      </div>

      <br />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default TicketAdminForm;
