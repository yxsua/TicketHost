import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div>
          <h1>Sistema de Tickets</h1>
        </div>

        <div className="landing-overview">
          <article className="landing-card">
            <strong>Cliente</strong>
            <p>Envía tickets, revisa el estado y consulta la conversación con soporte.</p>
          </article>

          <article className="landing-card">
            <strong>Agente</strong>
            <p>Administra tu cola de tickets, responde mensajes y cierra incidencias rápidamente.</p>
          </article>

          <article className="landing-card">
            <strong>Administrador</strong>
            <p>Controla usuarios, configura categorías y supervisa el rendimiento del sistema.</p>
          </article>
        </div>
      </section>

      <p>Selecciona tu tipo de acceso para comenzar:</p>

      <div className="landing-actions">
        <Link to="/login/cliente">
          <button>Cliente</button>
        </Link>

        <Link to="/login/agente">
          <button>Agente</button>
        </Link>

        <Link to="/login/admin">
          <button>Administrador</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;