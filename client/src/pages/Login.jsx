import { useState } from "react";
import { loginCliente, loginAgente, loginAdmin } from "../services/auth.service";
import "../styles/styles.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("cliente");

    const handleLogin = async () => {
        try {
            let res;

            if (role === "cliente") res = await loginCliente({ email, password });
            if (role === "agente") res = await loginAgente({ email, password });
            if (role === "admin") res = await loginAdmin({ email, password });

            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));

            window.location.href = "/tickets";
        } catch (err) {
            alert("Error en login");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <select onChange={(e) => setRole(e.target.value)}>
                <option value="cliente">Cliente</option>
                <option value="agente">Agente</option>
                <option value="admin">Admin</option>
            </select>

            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}