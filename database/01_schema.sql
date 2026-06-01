CREATE TABLE Categorias (
    categoria_id NUMBER PRIMARY KEY,
    nombre VARCHAR2(50) NOT NULL UNIQUE,
    descripcion CLOB,
    fecha_creacion TIMESTAMP DEFAULT SYSTIMESTAMP
) TABLESPACE PROYECTO_TS;

CREATE SEQUENCE seq_categoria
START WITH 1
INCREMENT BY 1
NOCACHE;

CREATE OR REPLACE TRIGGER trg_categoria
BEFORE INSERT ON Categorias
FOR EACH ROW
BEGIN
    IF :NEW.categoria_id IS NULL THEN
        SELECT seq_categoria.NEXTVAL
        INTO :NEW.categoria_id
        FROM dual;
    END IF;
END;
/

CREATE TABLE Clientes (
    cliente_id NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    email VARCHAR2(100) NOT NULL UNIQUE,
    telefono VARCHAR2(20),
    compania VARCHAR2(100),
    fecha_registro TIMESTAMP DEFAULT SYSTIMESTAMP
) TABLESPACE PROYECTO_TS;

CREATE SEQUENCE seq_cliente START WITH 1 INCREMENT BY 1 NOCACHE;

CREATE OR REPLACE TRIGGER trg_cliente
BEFORE INSERT ON Clientes
FOR EACH ROW
BEGIN
    IF :NEW.cliente_id IS NULL THEN
        SELECT seq_cliente.NEXTVAL
        INTO :NEW.cliente_id
        FROM dual;
    END IF;
END;
/

CREATE TABLE Agentes (
    agente_id NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    email VARCHAR2(100) NOT NULL UNIQUE,
    departamento VARCHAR2(50),
    activo NUMBER(1) DEFAULT 1
        CHECK (activo IN (0,1)),
    fecha_contratacion TIMESTAMP DEFAULT SYSTIMESTAMP
) TABLESPACE PROYECTO_TS;

CREATE SEQUENCE seq_agente START WITH 1 INCREMENT BY 1 NOCACHE;

CREATE OR REPLACE TRIGGER trg_agente
BEFORE INSERT ON Agentes
FOR EACH ROW
BEGIN
    IF :NEW.agente_id IS NULL THEN
        SELECT seq_agente.NEXTVAL
        INTO :NEW.agente_id
        FROM dual;
    END IF;
END;
/

CREATE TABLE Tickets (
    ticket_id NUMBER PRIMARY KEY,
    cliente_id NUMBER NOT NULL,
    agente_id NUMBER,
    categoria_id NUMBER NOT NULL,
    titulo VARCHAR2(150) NOT NULL,
    descripcion CLOB NOT NULL,
    prioridad VARCHAR2(20)
        DEFAULT 'Media'
        CHECK (prioridad IN ('Baja','Media','Alta','Critica')),
    estado VARCHAR2(20)
        DEFAULT 'Abierto'
        CHECK (
            estado IN (
                'Abierto',
                'En Proceso',
                'Espera Cliente',
                'Resuelto',
                'Cerrado'
            )
        ),
    fecha_creacion TIMESTAMP DEFAULT SYSTIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT SYSTIMESTAMP,
    CONSTRAINT fk_tickets_clientes
        FOREIGN KEY (cliente_id)
        REFERENCES Clientes(cliente_id),
    CONSTRAINT fk_tickets_agentes
        FOREIGN KEY (agente_id)
        REFERENCES Agentes(agente_id)
        ON DELETE SET NULL,
    CONSTRAINT fk_tickets_categorias
        FOREIGN KEY (categoria_id)
        REFERENCES Categorias(categoria_id)
) TABLESPACE PROYECTO_TS;

CREATE SEQUENCE seq_ticket START WITH 1 INCREMENT BY 1 NOCACHE;

CREATE OR REPLACE TRIGGER trg_ticket
BEFORE INSERT ON Tickets
FOR EACH ROW
BEGIN
    IF :NEW.ticket_id IS NULL THEN
        SELECT seq_ticket.NEXTVAL
        INTO :NEW.ticket_id
        FROM dual;
    END IF;
END;
/

CREATE TABLE HistorialEstado (
    historial_id NUMBER PRIMARY KEY,
    ticket_id NUMBER NOT NULL,
    estado_anterior VARCHAR2(20),
    estado_nuevo VARCHAR2(20) NOT NULL,
    cambiado_por VARCHAR2(100) NOT NULL,
    comentario CLOB,
    fecha_cambio TIMESTAMP DEFAULT SYSTIMESTAMP,
    CONSTRAINT fk_historial_ticket
        FOREIGN KEY (ticket_id)
        REFERENCES Tickets(ticket_id)
        ON DELETE CASCADE
) TABLESPACE PROYECTO_TS;

CREATE SEQUENCE seq_historial START WITH 1 INCREMENT BY 1 NOCACHE;

CREATE OR REPLACE TRIGGER trg_historial
BEFORE INSERT ON HistorialEstado
FOR EACH ROW
BEGIN
    IF :NEW.historial_id IS NULL THEN
        SELECT seq_historial.NEXTVAL
        INTO :NEW.historial_id
        FROM dual;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_ticket_update
BEFORE UPDATE ON Tickets
FOR EACH ROW
BEGIN
    :NEW.fecha_actualizacion := SYSTIMESTAMP;
END;
/