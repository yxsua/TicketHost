import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { obtenerCategorias, eliminarCategoria, crearCategoria, actualizarCategoria } from "../../api/categorias.api";

import DataTable from "../../components/DataTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import CategoriaForm from "../../components/forms/CategoriaForm";

function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingCategoria, setEditingCategoria] = useState(null);

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();

      setCategorias(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  useEffect(() => {
    console.log(categorias);
  }, [categorias]);

  const handleGuardar = async (values) => {
    try {
      if (editingCategoria) {
        await actualizarCategoria(editingCategoria.CATEGORIA_ID, values);

        toast.success("Categoría actualizada");
      } else {
        await crearCategoria(values);

        toast.success("Categoría creada");
      }

      setModalOpen(false);

      cargarCategorias();
    } catch (error) {
      toast.error("Error al guardar categoría");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar categoría?")) {
      return;
    }

    try {
      await eliminarCategoria(id);

      toast.success("Categoría eliminada");

      cargarCategorias();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const handleNuevaCategoria = () => {
    setEditingCategoria(null);

    setModalOpen(true);
  };

  const handleEditar = (categoria) => {
    setEditingCategoria(categoria);

    setModalOpen(true);
  };

  const columns = [
    {
      key: "CATEGORIA_ID",
      title: "ID",
    },
    {
      key: "NOMBRE",
      title: "Nombre",
    },
    {
      key: "DESCRIPCION",
      title: "Descripción",
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (row) => (
        <>
          <button onClick={() => handleEditar(row)}>Editar</button>

          <button onClick={() => handleEliminar(row.CATEGORIA_ID)}>
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
      <h1>Categorías</h1>

      <button onClick={handleNuevaCategoria}>Nueva Categoría</button>

      <br />
      <br />

      <DataTable
        columns={columns}
        data={categorias}
        searchable
        sortable
        paginated
        pageSize={10}
      />

      <Modal
        isOpen={modalOpen}
        title={editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
        onClose={() => setModalOpen(false)}
      >
        <CategoriaForm
          initialData={{
            nombre: editingCategoria?.NOMBRE,
            descripcion: editingCategoria?.DESCRIPCION,
          }}
          onSubmit={handleGuardar}
        />
      </Modal>
    </>
  );
}

export default CategoriasPage;
