import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import { obtenerMisAsignados, obtenerTicketsSinAsignar } from "../api/tickets.api";

function AgenteDashboard() {
  const { user } = useAuth();

  const [assignedTickets, setAssignedTickets] = useState([]);
  const [unassignedTickets, setUnassignedTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [assigned, unassigned] = await Promise.all([
          obtenerMisAsignados(),
          obtenerTicketsSinAsignar(),
        ]);

        setAssignedTickets(assigned);
        setUnassignedTickets(unassigned);
      } catch (error) {
        console.error(error);
        toast.error("No se pudo cargar el dashboard del agente");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const statusCounts = useMemo(() => {
    return assignedTickets.reduce(
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
  }, [assignedTickets]);

  const recentAssigned = useMemo(() => {
    return [...assignedTickets].slice(0, 4);
  }, [assignedTickets]);

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  return (
    <div className="dashboard-section">
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard Agente</h1>
          <p className="dashboard-intro">
            Hola, {user?.nombre}. Aquí tienes tu actividad reciente y los tickets disponibles.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card__title">Tickets asignados</div>
          <div className="dashboard-card__value">{assignedTickets.length}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Tickets sin asignar</div>
          <div className="dashboard-card__value">{unassignedTickets.length}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">En progreso</div>
          <div className="dashboard-card__value">{statusCounts.open}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Resueltos</div>
          <div className="dashboard-card__value">{statusCounts.closed}</div>
        </div>
      </div>

      <div className="dashboard-highlight">
        <div className="dashboard-card dashboard-highlight__item">
          <div className="dashboard-card__title">Tus últimos tickets</div>
          <ul className="dashboard-list">
            {recentAssigned.map((ticket) => (
              <li key={ticket.TICKET_ID} className="dashboard-list__item">
                <strong>{ticket.TITULO}</strong>
                <span>{ticket.ESTADO}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card dashboard-highlight__item">
          <div className="dashboard-card__title">Nota rápida</div>
          <p>
            Puedes ver y manejar tu cola desde la sección de tickets. Si necesitas 
            tomar un ticket nuevo, revisa los tickets sin asignar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AgenteDashboard;
