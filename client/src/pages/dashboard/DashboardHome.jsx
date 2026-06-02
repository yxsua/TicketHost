import { useAuth } from "../../context/AuthContext";

function DashboardHome() {
  const { user } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>

      <p>Bienvenido {user?.nombre}</p>

      <p>Tipo: {user?.tipo}</p>
    </>
  );
}

export default DashboardHome;
