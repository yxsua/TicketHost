import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {user?.tipo === "cliente" && (
          <>
            <Link className="sidebar-link" to="/cliente">
              Dashboard
            </Link>

            <Link className="sidebar-link" to="/cliente/tickets">
              Tickets
            </Link>
          </>
        )}

        {user?.tipo === "agente" && (
          <>
            <Link className="sidebar-link" to="/agente">
              Dashboard
            </Link>

            <Link className="sidebar-link" to="/agente/tickets">
              Tickets
            </Link>
          </>
        )}

        {user?.tipo === "admin" && (
          <>
            <Link className="sidebar-link" to="/admin">
              Dashboard
            </Link>

            <Link className="sidebar-link" to="/admin/tickets">
              Tickets
            </Link>

            <Link className="sidebar-link" to="/admin/categorias">
              Categorías
            </Link>

            <Link className="sidebar-link" to="/admin/clientes">
              Clientes
            </Link>

            <Link className="sidebar-link" to="/admin/agentes">
              Agentes
            </Link>
          </>
        )}

        <button className="sidebar-button" onClick={logout}>
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
