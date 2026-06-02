import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import { obtenerMisTickets } from "../api/tickets.api";
import { obtenerCategorias } from "../api/categorias.api";

function ClienteDashboard() {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [myTickets, availableCategories] = await Promise.all([
          obtenerMisTickets(),
          obtenerCategorias(),
        ]);

        setTickets(myTickets);
        setCategories(availableCategories);
      } catch (error) {
        console.error(error);
        toast.error("No se pudo cargar el dashboard del cliente");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const statusCounts = useMemo(() => {
    return tickets.reduce(
      (acc, ticket) => {
        const status = ticket.ESTADO?.toLowerCase();

        if (status?.includes("cerr") || status?.includes("resu")) {
          acc.closed += 1;
        } else {
          acc.open += 1;
        }

        return acc;
      },
      { open: 0, closed: 0 },
    );
  }, [tickets]);

  const recentTickets = useMemo(() => {
    return [...tickets].slice(0, 4);
  }, [tickets]);

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  return (
    <div className="dashboard-section">
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard Cliente</h1>
          <p className="dashboard-intro">
            Hola, {user?.nombre}. Aquí tienes el estado de tus tickets y las categorías disponibles.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card__title">Mis tickets</div>
          <div className="dashboard-card__value">{tickets.length}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Tickets abiertos</div>
          <div className="dashboard-card__value">{statusCounts.open}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Tickets cerrados</div>
          <div className="dashboard-card__value">{statusCounts.closed}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Categorías</div>
          <div className="dashboard-card__value">{categories.length}</div>
        </div>
      </div>

      <div className="dashboard-highlight">
        <div className="dashboard-card dashboard-highlight__item">
          <div className="dashboard-card__title">Últimos tickets</div>
          <ul className="dashboard-list">
            {recentTickets.map((ticket) => (
              <li key={ticket.TICKET_ID} className="dashboard-list__item">
                <strong>{ticket.TITULO}</strong>
                <span>{ticket.ESTADO}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card dashboard-highlight__item">
          <div className="dashboard-card__title">Consejo útil</div>
          <p>
            Usa el formulario de tickets para enviar nuevas solicitudes y revisa la conversación para mantenerte al día con las respuestas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClienteDashboard;
