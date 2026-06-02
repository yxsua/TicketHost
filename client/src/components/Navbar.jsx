import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <h2>Sistema de Tickets</h2>

      <div>
        <strong>{user?.nombre}</strong>
      </div>
    </header>
  );
}

export default Navbar;
