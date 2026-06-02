import { useState } from "react";

function CategoriaForm({ initialData, onSubmit }) {
  const [nombre, setNombre] = useState(initialData?.nombre || "");

  const [descripcion, setDescripcion] = useState(
    initialData?.descripcion || "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      nombre,
      descripcion,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Descripción</label>

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}

export default CategoriaForm;
