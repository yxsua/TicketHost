import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/test`
        );

        setRespuesta(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sistema de Tickets</h1>

      {loading && <p>Conectando...</p>}

      {error && <p>Error: {error}</p>}

      {respuesta && (
        <>
          <h2>Respuesta API</h2>
          <pre>{JSON.stringify(respuesta, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;