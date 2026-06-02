import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  obtenerAgentes,
  eliminarAgente,
  crearAgente,
  actualizarAgente,
} from "../../api/agentes.api";

import DataTable from "../../components/DataTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import AgenteForm from "../../components/forms/AgenteForm";

function AgentesPage() {
  const [agentes, setAgentes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingAgente, setEditingAgente] = useState(null);

  const cargarAgentes = async () => {
    try {
      const data = await obtenerAgentes();

      setAgentes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAgentes();
  }, []);

  useEffect(() => {
    console.log(agentes);
  }, [agentes]);

  const handleGuardar = async (values) => {
    try {
      if (editingAgente) {
        await actualizarAgente(editingAgente.AGENTE_ID, values);

        toast.success("Agente actualizado");
      } else {
        await crearAgente(values);

        toast.success("Agente creado");
      }

      setModalOpen(false);

      cargarAgentes();
    } catch (error) {
      toast.error("Error al guardar agente");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar agente?")) {
      return;
    }

    try {
      await eliminarAgente(id);

      toast.success("Agente eliminado");

      cargarAgentes();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const handleNuevoAgente = () => {
    setEditingAgente(null);

    setModalOpen(true);
  };

  const handleEditar = (agente) => {
    setEditingAgente(agente);

    setModalOpen(true);
  };

  const columns = [
    {
      key: "AGENTE_ID",
      title: "ID",
    },
    {
      key: "NOMBRE",
      title: "Nombre",
    },
    {
      key: "EMAIL",
      title: "Email",
    },
    {
      key: "DEPARTAMENTO",
      title: "Departamento",
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (row) => (
        <>
          <button onClick={() => handleEditar(row)}>Editar</button>

          <button onClick={() => handleEliminar(row.AGENTE_ID)}>
            Eliminar
          </button>
        </>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1>Agentes</h1>

      <button onClick={handleNuevoAgente}>Nuevo Agente</button>

      <br />
      <br />

      <DataTable
        columns={columns}
        data={agentes}
        searchable
        sortable
        paginated
        pageSize={10}
      />

      <Modal
        isOpen={modalOpen}
        title={editingAgente ? "Editar Agente" : "Nuevo Agente"}
        onClose={() => setModalOpen(false)}
      >
        <AgenteForm
          initialData={{
            nombre: editingAgente?.NOMBRE,
            email: editingAgente?.EMAIL,
            departamento: editingAgente?.DEPARTAMENTO,
          }}
          onSubmit={handleGuardar}
        />
      </Modal>
    </>
  );
}

export default AgentesPage;
