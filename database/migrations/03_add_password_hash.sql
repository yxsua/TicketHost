ALTER TABLE Clientes
ADD (
    password_hash VARCHAR2(255)
);

UPDATE Clientes
SET password_hash = 'PENDIENTE';

ALTER TABLE Clientes
MODIFY (
    password_hash NOT NULL
);

ALTER TABLE Agentes
ADD (
    password_hash VARCHAR2(255)
);

UPDATE Agentes
SET password_hash = 'PENDIENTE';

ALTER TABLE Agentes
MODIFY (
    password_hash NOT NULL
);