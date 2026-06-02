CREATE TABLE ticket_comentario (
    comentario_id NUMBER NOT NULL,
    ticket_id NUMBER NOT NULL,
    usuario_id NUMBER NOT NULL,
    usuario_tipo VARCHAR2(20) NOT NULL,
    mensaje CLOB NOT NULL,
    fecha_creacion DATE DEFAULT SYSDATE,
    eliminado NUMBER(1) DEFAULT 0,
    CONSTRAINT pk_ticket_comentario
        PRIMARY KEY (comentario_id),
    CONSTRAINT fk_comentario_ticket
        FOREIGN KEY (ticket_id)
        REFERENCES tickets(ticket_id)
);

CREATE SEQUENCE seq_ticket_comentario
START WITH 1
INCREMENT BY 1
NOCACHE;

CREATE OR REPLACE TRIGGER trg_ticket_comentario_bi
BEFORE INSERT ON ticket_comentario
FOR EACH ROW
BEGIN
    IF :NEW.comentario_id IS NULL THEN
        SELECT seq_ticket_comentario.NEXTVAL
        INTO :NEW.comentario_id
        FROM dual;
    END IF;
END;
/

CREATE OR REPLACE VIEW vw_ticket_comentarios AS
SELECT
    tc.comentario_id,
    tc.ticket_id,
    tc.usuario_id,
    tc.usuario_tipo,
    tc.mensaje,
    tc.fecha_creacion
FROM ticket_comentario tc
WHERE tc.eliminado = 0;

CREATE OR REPLACE PROCEDURE sp_insertar_comentario_ticket (
    p_ticket_id      IN NUMBER,
    p_usuario_id     IN NUMBER,
    p_usuario_tipo   IN VARCHAR2,
    p_mensaje        IN CLOB
)
AS
BEGIN
    INSERT INTO ticket_comentario (
        ticket_id,
        usuario_id,
        usuario_tipo,
        mensaje
    )
    VALUES (
        p_ticket_id,
        p_usuario_id,
        p_usuario_tipo,
        p_mensaje
    );
END;
/

CREATE OR REPLACE PROCEDURE sp_eliminar_comentario_ticket (
    p_comentario_id IN NUMBER
)
AS
BEGIN
    UPDATE ticket_comentario
    SET eliminado = 1
    WHERE comentario_id = p_comentario_id;
END;
/

CREATE OR REPLACE FUNCTION fn_puede_comentar_ticket (
    p_ticket_id NUMBER,
    p_usuario_id NUMBER,
    p_usuario_tipo VARCHAR2
)
RETURN NUMBER
AS
    v_count NUMBER;
BEGIN

    IF p_usuario_tipo = 'admin' THEN
        RETURN 1;
    END IF;

    IF p_usuario_tipo = 'cliente' THEN
        SELECT COUNT(*)
        INTO v_count
        FROM tickets
        WHERE ticket_id = p_ticket_id
        AND cliente_id = p_usuario_id;
        RETURN v_count;
    END IF;

    IF p_usuario_tipo = 'agente' THEN
        SELECT COUNT(*)
        INTO v_count
        FROM tickets
        WHERE ticket_id = p_ticket_id
        AND agente_id = p_usuario_id;
        RETURN v_count;
    END IF;

    RETURN 0;
END;
/