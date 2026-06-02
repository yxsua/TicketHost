import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  obtenerTickets,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstadoTicket,
} from "../../api/tickets.api";

import { obtenerCategorias } from "../../api/categorias.api";
import { obtenerClientes } from "../../api/clientes.api";
import { obtenerAgentes } from "../../api/agentes.api";

import DataTable from "../../components/DataTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";

import TicketAdminForm from "../../components/forms/TicketAdminForm";
import TicketStatusForm from "../../components/forms/TicketStatusForm";
import TicketHistoryModal from "../../components/TicketHistoryModal";
import TicketConversationModal from "../../components/TicketConversationModal";

function TicketsAdminPage() {
  const [tickets, setTickets] = useState([]);

  const [categorias, setCategorias] = useState([]);

  const [clientes, setClientes] = useState([]);

  const [agentes, setAgentes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [conversationOpen, setConversationOpen] = useState(false);

  const [historyOpen, setHistoryOpen] = useState(false);

  const [editingTicket, setEditingTicket] = useState(null);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const cargarDatos = async () => {
    try {
      const [ticketsData, categoriasData, clientesData, agentesData] =
        await Promise.all([
          obtenerTickets(),
          obtenerCategorias(),
          obtenerClientes(),
          obtenerAgentes(),
        ]);

      setTickets(ticketsData);

      setCategorias(categoriasData);

      setClientes(clientesData);

      setAgentes(agentesData);
    } catch (error) {
      console.error(error);

      toast.error("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleGuardar = async (values) => {
    try {
      if (editingTicket) {
        await actualizarTicket(editingTicket.TICKET_ID, values);

        toast.success("Ticket actualizado");
      } else {
        await crearTicket(values);

        toast.success("Ticket creado");
      }

      setTicketModalOpen(false);

      setEditingTicket(null);

      cargarDatos();
    } catch (error) {
      console.error(error);

      toast.error("Error guardando ticket");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar ticket?")) {
      return;
    }

    try {
      await eliminarTicket(id);

      toast.success("Ticket eliminado");

      cargarDatos();
    } catch {
      toast.error("Error eliminando ticket");
    }
  };

  const handleCambiarEstado = async (estado, comentario) => {
    try {
      await cambiarEstadoTicket(selectedTicket.TICKET_ID, estado, comentario);

      toast.success("Estado actualizado");

      setStatusModalOpen(false);

      cargarDatos();
    } catch (error) {
      console.error(error);

      toast.error("Error actualizando estado");
    }
  };

  const columns = [
    {
      key: "TICKET_ID",
      title: "ID",
    },
    {
      key: "TITULO",
      title: "Título",
    },
    {
      key: "CLIENTE_NOMBRE",
      title: "Cliente",
    },
    {
      key: "AGENTE_NOMBRE",
      title: "Agente",
    },
    {
      key: "ESTADO",
      title: "Estado",
    },
    {
      key: "PRIORIDAD",
      title: "Prioridad",
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (row) => (
        <>
          <button
            onClick={() => {
              setEditingTicket(row);

              setTicketModalOpen(true);
            }}
          >
            Editar
          </button>

          <button onClick={() => handleEliminar(row.TICKET_ID)}>
            Eliminar
          </button>

          <button
            onClick={() => {
              setSelectedTicket(row);

              setStatusModalOpen(true);
            }}
          >
            Estado
          </button>

          <button
            onClick={() => {
              setSelectedTicket(row.TICKET_ID);

              setHistoryOpen(true);
            }}
          >
            Historial
          </button>

          <button
            onClick={() => {
              setSelectedTicket(row.TICKET_ID);

              setConversationOpen(true);
            }}
          >
            Conversación
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
      <h1>Gestión de Tickets</h1>

      <button
        onClick={() => {
          setEditingTicket(null);

          setTicketModalOpen(true);
        }}
      >
        Nuevo Ticket
      </button>

      <br />
      <br />

      <DataTable
        columns={columns}
        data={tickets}
        searchable
        sortable
        paginated
      />

      <Modal
        isOpen={ticketModalOpen}
        title={editingTicket ? "Editar Ticket" : "Nuevo Ticket"}
        onClose={() => setTicketModalOpen(false)}
      >
        <TicketAdminForm
          initialData={editingTicket}
          categorias={categorias}
          clientes={clientes}
          agentes={agentes}
          onSubmit={handleGuardar}
        />
      </Modal>

      <Modal
        isOpen={statusModalOpen}
        title="Actualizar Estado"
        onClose={() => setStatusModalOpen(false)}
      >
        <TicketStatusForm
          ticket={selectedTicket}
          onSubmit={handleCambiarEstado}
        />
      </Modal>

      <Modal
        isOpen={historyOpen}
        title="Historial"
        onClose={() => setHistoryOpen(false)}
      >
        <TicketHistoryModal ticketId={selectedTicket} />
      </Modal>

      <Modal
        isOpen={conversationOpen}
        title="Conversación"
        onClose={() => setConversationOpen(false)}
      >
        <TicketConversationModal ticketId={selectedTicket} />
      </Modal>
    </>
  );
}

export default TicketsAdminPage;
