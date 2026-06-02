import { useEffect, useState } from "react";

function AgenteForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    departamento: "",
    password: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        email: initialData.email || "",
        departamento: initialData.departamento || "",
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
        name="departamento"
        placeholder="Departamento"
        value={form.departamento}
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

export default AgenteForm;
