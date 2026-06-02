import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    loginCliente,
    loginAgente,
    loginAdmin,
} from "../services/auth.service";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("cliente");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            let res;

            if (role === "cliente") {
                res = await loginCliente({ email, password });
            }

            if (role === "agente") {
                res = await loginAgente({ email, password });
            }

            if (role === "admin") {
                res = await loginAdmin({ email, password });
            }

            const token = res?.data?.data?.token;
            const user = res?.data?.data?.user;

            if (!token || !user) {
                throw new Error("Respuesta de login inválida");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/tickets");
        } catch (error) {
            console.error("Error login:", error);
            alert("Error en login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "80px auto",
                padding: "20px",
                background: "#1e293b",
                borderRadius: "10px",
            }}
        >
            <h2>Login</h2>

            <div style={{ marginBottom: "10px" }}>
                <label>Rol</label>
                <br />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: "100%", padding: "8px" }}
                >
                    <option value="cliente">Cliente</option>
                    <option value="agente">Agente</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Email</label>
                <br />
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label>Password</label>
                <br />
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "10px",
                }}
            >
                {loading ? "Ingresando..." : "Entrar"}
            </button>
        </div>
    );
}