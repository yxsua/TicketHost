import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { loginAdmin } from "../../api/authApi";

function LoginAdminPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(
        email,
        password,
      );

      login(
        response.token,
        response.user,
      );

      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión",
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login Administrador</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Iniciar Sesión</button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <Link to="/" className="auth-back">
          Regresar a la página principal
        </Link>
      </div>
    </div>
  );
}
export default LoginAdminPage;