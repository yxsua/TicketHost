import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { obtenerMisTickets, crearTicket } from "../../api/tickets.api";

import { obtenerCategorias } from "../../api/categorias.api";

import DataTable from "../../components/DataTable";

import Modal from "../../components/Modal";

import LoadingSpinner from "../../components/LoadingSpinner";

import TicketForm from "../../components/forms/TicketForm";

import TicketHistoryModal from "../../components/TicketHistoryModal";

import TicketConversationModal from "../../components/TicketConversationModal";

function TicketsClientPage() {
  const [tickets, setTickets] = useState([]);

  const [categorias, setCategorias] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [historyOpen, setHistoryOpen] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [conversationOpen, setConversationOpen] = useState(false);

  const cargarDatos = async () => {
    try {
      const [ticketsData, categoriasData] = await Promise.all([
        obtenerMisTickets(),
        obtenerCategorias(),
      ]);

      setTickets(ticketsData);

      setCategorias(categoriasData);
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

  const handleCrear = async (values) => {
    try {
      await crearTicket(values);

      toast.success("Ticket creado");

      setModalOpen(false);

      cargarDatos();
    } catch {
      toast.error("Error al crear ticket");
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
      key: "acciones",
      title: "Acciones",
      render: (row) => (
        <>
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
      <h1>Mis Tickets</h1>

      <button onClick={() => setModalOpen(true)}>Nuevo Ticket</button>

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
        isOpen={modalOpen}
        title="Nuevo Ticket"
        onClose={() => setModalOpen(false)}
      >
        <TicketForm categorias={categorias} onSubmit={handleCrear} />
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

export default TicketsClientPage;
