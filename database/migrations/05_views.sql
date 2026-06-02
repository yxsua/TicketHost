--------------------------------------------------
-- CATEGORIAS ACTIVAS
--------------------------------------------------

CREATE OR REPLACE VIEW vw_categorias AS
SELECT *
FROM Categorias
WHERE activo = 1;

--------------------------------------------------
-- CLIENTES ACTIVOS
--------------------------------------------------

CREATE OR REPLACE VIEW vw_clientes AS
SELECT
    cliente_id,
    nombre,
    email,
    telefono,
    compania,
    fecha_registro
FROM Clientes
WHERE activo = 1;

--------------------------------------------------
-- AGENTES ACTIVOS
--------------------------------------------------

CREATE OR REPLACE VIEW vw_agentes AS
SELECT
    agente_id,
    nombre,
    email,
    departamento,
    fecha_contratacion
FROM Agentes
WHERE activo = 1;

--------------------------------------------------
-- TICKETS ACTIVOS
--------------------------------------------------

CREATE OR REPLACE VIEW vw_tickets AS
SELECT *
FROM Tickets
WHERE activo = 1;

--------------------------------------------------
-- HISTORIAL ACTIVO
--------------------------------------------------

CREATE OR REPLACE VIEW vw_historial_estado AS
SELECT *
FROM HistorialEstado
WHERE activo = 1;

CREATE OR REPLACE VIEW vw_tickets_detalle AS
SELECT
    t.ticket_id,
    t.titulo,
    t.descripcion,
    t.prioridad,
    t.estado,
    t.fecha_creacion,
    t.fecha_actualizacion,
    c.cliente_id,
    c.nombre AS cliente_nombre,
    c.email AS cliente_email,
    a.agente_id,
    a.nombre AS agente_nombre,
    cat.categoria_id,
    cat.nombre AS categoria_nombre
FROM Tickets t
INNER JOIN Clientes c
    ON t.cliente_id = c.cliente_id
INNER JOIN Categorias cat
    ON t.categoria_id = cat.categoria_id
LEFT JOIN Agentes a
    ON t.agente_id = a.agente_id
WHERE t.activo = 1
  AND c.activo = 1
  AND cat.activo = 1
  AND (a.activo = 1 OR a.agente_id IS NULL);

CREATE OR REPLACE VIEW vw_tickets_abiertos AS
SELECT *
FROM vw_tickets
WHERE estado IN (
    'Abierto',
    'En Proceso',
    'Espera Cliente'
);

CREATE OR REPLACE VIEW vw_tickets_resueltos AS
SELECT *
FROM vw_tickets
WHERE estado IN (
    'Resuelto',
    'Cerrado'
);

CREATE OR REPLACE VIEW vw_carga_agentes AS
SELECT
    a.agente_id,
    a.nombre,
    COUNT(t.ticket_id) AS tickets_asignados
FROM Agentes a
LEFT JOIN Tickets t
    ON a.agente_id = t.agente_id
   AND t.activo = 1
   AND t.estado <> 'Cerrado'
WHERE a.activo = 1
GROUP BY
    a.agente_id,
    a.nombre;

CREATE OR REPLACE VIEW vw_historial_detalle AS
SELECT
    h.historial_id,
    h.ticket_id,
    t.titulo,
    h.estado_anterior,
    h.estado_nuevo,
    h.cambiado_por,
    h.comentario,
    h.fecha_cambio
FROM HistorialEstado h
INNER JOIN Tickets t
    ON h.ticket_id = t.ticket_id
WHERE h.activo = 1
  AND t.activo = 1;