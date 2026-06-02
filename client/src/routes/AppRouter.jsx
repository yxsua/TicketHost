import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

import LoginClientePage from "../pages/auth/LoginClientePage";
import LoginAgentePage from "../pages/auth/LoginAgentePage";
import LoginAdminPage from "../pages/auth/LoginAdminPage";

import ClienteDashboard from "../pages/ClienteDashboard";
import AgenteDashboard from "../pages/AgenteDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";

import TicketsAdminPage from "../pages/tickets/TicketsAdminPage";
import TicketsAgentPage from "../pages/tickets/TicketsAgentPage";
import TicketsClientPage from "../pages/tickets/TicketsClientPage";

import CategoriasPage from "../pages/categorias/CategoriasPage";
import ClientesPage from "../pages/clientes/ClientesPage";
import AgentesPage from "../pages/agentes/AgentesPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login/cliente"
          element={
            <PublicRoute>
              <LoginClientePage />
            </PublicRoute>
          }
        />

        <Route
          path="/login/agente"
          element={
            <PublicRoute>
              <LoginAgentePage />
            </PublicRoute>
          }
        />

        <Route
          path="/login/admin"
          element={
            <PublicRoute>
              <LoginAdminPage />
            </PublicRoute>
          }
        />

        <Route element={<DashboardLayout />}>
          <Route
            path="/cliente"
            element={
              <ProtectedRoute allowedRoles={["cliente"]}>
                <ClienteDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cliente/tickets"
            element={
              <ProtectedRoute allowedRoles={["cliente"]}>
                <TicketsClientPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agente"
            element={
              <ProtectedRoute allowedRoles={["agente"]}>
                <AgenteDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agente/tickets"
            element={
              <ProtectedRoute allowedRoles={["agente"]}>
                <TicketsAgentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TicketsAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categorias"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CategoriasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/clientes"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ClientesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/agentes"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AgentesPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
