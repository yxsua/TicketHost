import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <h3>Tickets System</h3>

            <div>
                <Link to="/tickets">Tickets</Link>

                {user?.role === "admin" && (
                    <Link to="/clientes">Clientes</Link>
                )}
            </div>

            <div>
                <span>{user?.email}</span>
                <button onClick={logout}>Salir</button>
            </div>
        </nav>
    );
}