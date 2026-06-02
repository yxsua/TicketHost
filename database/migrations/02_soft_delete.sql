--------------------------------------------------
-- CATEGORIAS
--------------------------------------------------

ALTER TABLE Categorias
ADD (
    activo NUMBER(1) DEFAULT 1 NOT NULL
);

ALTER TABLE Categorias
ADD CONSTRAINT chk_categoria_activo
CHECK (activo IN (0,1));

--------------------------------------------------
-- CLIENTES
--------------------------------------------------

ALTER TABLE Clientes
ADD (
    activo NUMBER(1) DEFAULT 1 NOT NULL
);

ALTER TABLE Clientes
ADD CONSTRAINT chk_cliente_activo
CHECK (activo IN (0,1));

--------------------------------------------------
-- AGENTES
--------------------------------------------------

-- La tabla ya tiene el campo activo.
-- Solo nos aseguramos de que no haya nulos.

UPDATE Agentes
SET activo = 1
WHERE activo IS NULL;

ALTER TABLE Agentes
MODIFY activo DEFAULT 1 NOT NULL;

--------------------------------------------------
-- TICKETS
--------------------------------------------------

ALTER TABLE Tickets
ADD (
    activo NUMBER(1) DEFAULT 1 NOT NULL
);

ALTER TABLE Tickets
ADD CONSTRAINT chk_ticket_activo
CHECK (activo IN (0,1));

--------------------------------------------------
-- HISTORIAL ESTADO
--------------------------------------------------

ALTER TABLE HistorialEstado
ADD (
    activo NUMBER(1) DEFAULT 1 NOT NULL
);

ALTER TABLE HistorialEstado
ADD CONSTRAINT chk_historial_activo
CHECK (activo IN (0,1));

COMMIT;