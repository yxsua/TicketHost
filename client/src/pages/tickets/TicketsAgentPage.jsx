import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  obtenerTickets,
  asignarmeTicket,
  cambiarEstadoTicket,
} from "../../api/tickets.api";

import DataTable from "../../components/DataTable";

import LoadingSpinner from "../../components/LoadingSpinner";

import Modal from "../../components/Modal";

import TicketHistoryModal from "../../components/TicketHistoryModal";

import TicketStatusForm from "../../components/forms/TicketStatusForm";

import TicketConversationModal from "../../components/TicketConversationModal";

function TicketsAgentPage() {
  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [historyOpen, setHistoryOpen] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [selectedTicketData, setSelectedTicketData] = useState(null);

  const [conversationOpen, setConversationOpen] = useState(false);

  const cargarTickets = async () => {
    try {
      const data = await obtenerTickets();

      console.log(data);
      setTickets(data);
    } catch {
      toast.error("Error cargando tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  const handleAsignarme = async (id) => {
    try {
      await asignarmeTicket(id);

      toast.success("Ticket asignado");

      cargarTickets();
    } catch {
      toast.error("No se pudo asignar");
    }
  };

  const handleCambiarEstado = async (values) => {
    try {
      await cambiarEstadoTicket(selectedTicketData.TICKET_ID, values);

      toast.success("Estado actualizado");

      setStatusModalOpen(false);

      cargarTickets();
    } catch {
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
      key: "ESTADO",
      title: "Estado",
    },
    {
      key: "PRIORIDAD",
      title: "Prioridad",
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
      key: "acciones",
      title: "Acciones",
      render: (row) => (
        <>
          <button onClick={() => handleAsignarme(row.TICKET_ID)}>
            Tomar Ticket
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
              setSelectedTicketData(row);

              setStatusModalOpen(true);
            }}
          >
            Responder
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

      <DataTable
        columns={columns}
        data={tickets}
        searchable
        sortable
        paginated
      />

      <Modal
        isOpen={historyOpen}
        title="Historial"
        onClose={() => setHistoryOpen(false)}
      >
        <TicketHistoryModal ticketId={selectedTicket} />
      </Modal>

      <Modal
        isOpen={statusModalOpen}
        title="Actualizar Estado"
        onClose={() => setStatusModalOpen(false)}
      >
        <TicketStatusForm
          ticket={selectedTicketData}
          onSubmit={handleCambiarEstado}
        />
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

export default TicketsAgentPage;
