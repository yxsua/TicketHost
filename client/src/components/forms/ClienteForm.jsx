import { useEffect, useState } from "react";

function ClienteForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    compania: "",
    password: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        email: initialData.email || "",
        telefono: initialData.telefono || "",
        compania: initialData.compania || "",
        password: "",
      });
    }
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
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
      />

      <input
        name="compania"
        placeholder="Compañía"
        value={form.compania}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default ClienteForm;
