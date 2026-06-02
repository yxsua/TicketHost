import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (user) {
    switch (user.tipo) {
      case "cliente":
        return <Navigate to="/cliente" replace />;

      case "agente":
        return <Navigate to="/agente" replace />;

      case "admin":
        return <Navigate to="/admin" replace />;

      default:
        break;
    }
  }

  return children;
}

export default PublicRoute;