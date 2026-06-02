import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import { obtenerCategorias } from "../api/categorias.api";
import { obtenerClientes } from "../api/clientes.api";
import { obtenerAgentes } from "../api/agentes.api";
import { obtenerTickets } from "../api/tickets.api";

function AdminDashboard() {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [metrics, setMetrics] = useState({ categories: 0, clients: 0, agents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [ticketData, categories, clients, agents] = await Promise.all([
          obtenerTickets(),
          obtenerCategorias(),
          obtenerClientes(),
          obtenerAgentes(),
        ]);

        setTickets(ticketData);
        setMetrics({
          categories: categories.length,
          clients: clients.length,
          agents: agents.length,
        });
      } catch (error) {
        console.error(error);
        toast.error("No se pudo cargar el dashboard");
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
        } else if (status?.includes("pend") || status?.includes("progre") || status?.includes("open") || status?.includes("nuevo")) {
          acc.open += 1;
        } else {
          acc.other += 1;
        }

        return acc;
      },
      { open: 0, closed: 0, other: 0 },
    );
  }, [tickets]);

  const latestTickets = useMemo(() => {
    return [...tickets]
      .sort((a, b) => (b.TICKET_ID || 0) - (a.TICKET_ID || 0))
      .slice(0, 4);
  }, [tickets]);

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  return (
    <div className="dashboard-section">
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard Administrador</h1>
          <p className="dashboard-intro">
            Bienvenido, {user?.nombre}. Aquí tienes un resumen rápido del sistema.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card__title">Tickets totales</div>
          <div className="dashboard-card__value">{tickets.length}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Tickets abiertos</div>
          <div className="dashboard-card__value">{statusCounts.open}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Clientes registrados</div>
          <div className="dashboard-card__value">{metrics.clients}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Categorías</div>
          <div className="dashboard-card__value">{metrics.categories}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Agentes activos</div>
          <div className="dashboard-card__value">{metrics.agents}</div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__title">Tickets cerrados</div>
          <div className="dashboard-card__value">{statusCounts.closed}</div>
        </div>
      </div>

      <div className="dashboard-highlight">
        <div className="dashboard-card dashboard-highlight__item">
          <div className="dashboard-card__title">Últimos tickets registrados</div>
          <ul className="dashboard-list">
            {latestTickets.map((ticket) => (
              <li key={ticket.TICKET_ID} className="dashboard-list__item">
                <strong>{ticket.TITULO}</strong>
                <span>{ticket.ESTADO}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card dashboard-highlight__item">
          <div className="dashboard-card__title">Resumen rápido</div>
          <div className="dashboard-card__meta">
            <span>Tickets totales</span>
            <strong>{tickets.length}</strong>
          </div>
          <div className="dashboard-card__meta">
            <span>Abiertos</span>
            <strong>{statusCounts.open}</strong>
          </div>
          <div className="dashboard-card__meta">
            <span>Cerrados</span>
            <strong>{statusCounts.closed}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
