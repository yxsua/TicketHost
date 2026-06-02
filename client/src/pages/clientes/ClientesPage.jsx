import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  obtenerClientes,
  eliminarCliente,
  crearCliente,
  actualizarCliente,
} from "../../api/clientes.api";

import DataTable from "../../components/DataTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import ClienteForm from "../../components/forms/ClienteForm";

function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingCliente, setEditingCliente] = useState(null);

  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();

      setClientes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  useEffect(() => {
    console.log(clientes);
  }, [clientes]);

  const handleGuardar = async (values) => {
    try {
      if (editingCliente) {
        await actualizarCliente(editingCliente.CLIENTE_ID, values);

        toast.success("Cliente actualizado");
      } else {
        await crearCliente(values);

        toast.success("Cliente creado");
      }

      setModalOpen(false);

      cargarClientes();
    } catch (error) {
      toast.error("Error al guardar cliente");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar cliente?")) {
      return;
    }

    try {
      await eliminarCliente(id);

      toast.success("Cliente eliminado");

      cargarClientes();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const handleNuevoCliente = () => {
    setEditingCliente(null);

    setModalOpen(true);
  };

  const handleEditar = (cliente) => {
    setEditingCliente(cliente);

    setModalOpen(true);
  };

  const columns = [
    {
      key: "CLIENTE_ID",
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
      key: "TELEFONO",
      title: "Teléfono",
    },
    {
      key: "COMPANIA",
      title: "Compañía",
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (row) => (
        <>
          <button onClick={() => handleEditar(row)}>Editar</button>

          <button onClick={() => handleEliminar(row.CLIENTE_ID)}>
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
      <h1>Clientes</h1>

      <button onClick={handleNuevoCliente}>Nuevo Cliente</button>

      <br />
      <br />

      <DataTable
        columns={columns}
        data={clientes}
        searchable
        sortable
        paginated
        pageSize={10}
      />

      <Modal
        isOpen={modalOpen}
        title={editingCliente ? "Editar Cliente" : "Nuevo Cliente"}
        onClose={() => setModalOpen(false)}
      >
        <ClienteForm
          initialData={{
            nombre: editingCliente?.NOMBRE,
            descripcion: editingCliente?.DESCRIPCION,
          }}
          onSubmit={handleGuardar}
        />
      </Modal>
    </>
  );
}

export default ClientesPage;
