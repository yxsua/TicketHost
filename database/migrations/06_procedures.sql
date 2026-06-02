CREATE OR REPLACE PROCEDURE sp_insertar_categoria(
    p_nombre        IN VARCHAR2,
    p_descripcion   IN CLOB
)
AS
BEGIN
    INSERT INTO Categorias (
        nombre,
        descripcion
    )
    VALUES (
        p_nombre,
        p_descripcion
    );

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_actualizar_categoria(
    p_categoria_id  IN NUMBER,
    p_nombre        IN VARCHAR2,
    p_descripcion   IN CLOB
)
AS
BEGIN
    UPDATE Categorias
    SET nombre = p_nombre,
        descripcion = p_descripcion
    WHERE categoria_id = p_categoria_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20001,
            'Categoria no encontrada o inactiva.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_eliminar_categoria(
    p_categoria_id IN NUMBER
)
AS
BEGIN
    UPDATE Categorias
    SET activo = 0
    WHERE categoria_id = p_categoria_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20002,
            'Categoria no encontrada o ya eliminada.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_insertar_cliente(
    p_nombre         IN VARCHAR2,
    p_email          IN VARCHAR2,
    p_telefono       IN VARCHAR2,
    p_compania       IN VARCHAR2,
    p_password_hash  IN VARCHAR2
)
AS
BEGIN
    INSERT INTO Clientes (
        nombre,
        email,
        telefono,
        compania,
        password_hash
    )
    VALUES (
        p_nombre,
        p_email,
        p_telefono,
        p_compania,
        p_password_hash
    );

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_actualizar_cliente(
    p_cliente_id     IN NUMBER,
    p_nombre         IN VARCHAR2,
    p_email          IN VARCHAR2,
    p_telefono       IN VARCHAR2,
    p_compania       IN VARCHAR2,
    p_password_hash  IN VARCHAR2
)
AS
BEGIN
    UPDATE Clientes
    SET nombre = p_nombre,
        email = p_email,
        telefono = p_telefono,
        compania = p_compania,
        password_hash = p_password_hash
    WHERE cliente_id = p_cliente_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20003,
            'Cliente no encontrado o inactivo.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_obtener_cliente_login(
    p_email IN VARCHAR2,
    p_cursor OUT SYS_REFCURSOR
)
AS
BEGIN
    OPEN p_cursor FOR
        SELECT
            cliente_id,
            nombre,
            email,
            password_hash
        FROM Clientes
        WHERE email = p_email
          AND activo = 1;
END;
/

CREATE OR REPLACE PROCEDURE sp_eliminar_cliente(
    p_cliente_id IN NUMBER
)
AS
BEGIN
    UPDATE Clientes
    SET activo = 0
    WHERE cliente_id = p_cliente_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20004,
            'Cliente no encontrado o ya eliminado.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_insertar_agente(
    p_nombre         IN VARCHAR2,
    p_email          IN VARCHAR2,
    p_departamento   IN VARCHAR2,
    p_password_hash  IN VARCHAR2
)
AS
BEGIN
    INSERT INTO Agentes (
        nombre,
        email,
        departamento,
        password_hash
    )
    VALUES (
        p_nombre,
        p_email,
        p_departamento,
        p_password_hash
    );

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_actualizar_agente(
    p_agente_id      IN NUMBER,
    p_nombre         IN VARCHAR2,
    p_email          IN VARCHAR2,
    p_departamento   IN VARCHAR2,
    p_password_hash  IN VARCHAR2
)
AS
BEGIN
    UPDATE Agentes
    SET nombre = p_nombre,
        email = p_email,
        departamento = p_departamento,
        password_hash = p_password_hash
    WHERE agente_id = p_agente_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20005,
            'Agente no encontrado o inactivo.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_obtener_agente_login(
    p_email IN VARCHAR2,
    p_cursor OUT SYS_REFCURSOR
)
AS
BEGIN
    OPEN p_cursor FOR
        SELECT
            agente_id,
            nombre,
            email,
            departamento,
            password_hash
        FROM Agentes
        WHERE email = p_email
          AND activo = 1;
END;
/

CREATE OR REPLACE PROCEDURE sp_eliminar_agente(
    p_agente_id IN NUMBER
)
AS
BEGIN
    UPDATE Agentes
    SET activo = 0
    WHERE agente_id = p_agente_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20006,
            'Agente no encontrado o ya eliminado.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_insertar_ticket(
    p_cliente_id      IN NUMBER,
    p_agente_id       IN NUMBER,
    p_categoria_id    IN NUMBER,
    p_titulo          IN VARCHAR2,
    p_descripcion     IN CLOB,
    p_prioridad       IN VARCHAR2,
    p_estado          IN VARCHAR2
)
AS
BEGIN
    INSERT INTO Tickets (
        cliente_id,
        agente_id,
        categoria_id,
        titulo,
        descripcion,
        prioridad,
        estado
    )
    VALUES (
        p_cliente_id,
        p_agente_id,
        p_categoria_id,
        p_titulo,
        p_descripcion,
        p_prioridad,
        p_estado
    );

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_actualizar_ticket(
    p_ticket_id       IN NUMBER,
    p_cliente_id      IN NUMBER,
    p_agente_id       IN NUMBER,
    p_categoria_id    IN NUMBER,
    p_titulo          IN VARCHAR2,
    p_descripcion     IN CLOB,
    p_prioridad       IN VARCHAR2,
    p_estado          IN VARCHAR2
)
AS
BEGIN
    UPDATE Tickets
    SET cliente_id   = p_cliente_id,
        agente_id    = p_agente_id,
        categoria_id = p_categoria_id,
        titulo       = p_titulo,
        descripcion  = p_descripcion,
        prioridad    = p_prioridad,
        estado       = p_estado
    WHERE ticket_id = p_ticket_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20007,
            'Ticket no encontrado o inactivo.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_eliminar_ticket(
    p_ticket_id IN NUMBER
)
AS
BEGIN
    UPDATE Tickets
    SET activo = 0
    WHERE ticket_id = p_ticket_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20008,
            'Ticket no encontrado o ya eliminado.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_insertar_historial(
    p_ticket_id         IN NUMBER,
    p_estado_anterior   IN VARCHAR2,
    p_estado_nuevo      IN VARCHAR2,
    p_cambiado_por      IN VARCHAR2,
    p_comentario        IN CLOB
)
AS
BEGIN
    INSERT INTO HistorialEstado (
        ticket_id,
        estado_anterior,
        estado_nuevo,
        cambiado_por,
        comentario
    )
    VALUES (
        p_ticket_id,
        p_estado_anterior,
        p_estado_nuevo,
        p_cambiado_por,
        p_comentario
    );

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_actualizar_historial(
    p_historial_id      IN NUMBER,
    p_estado_anterior   IN VARCHAR2,
    p_estado_nuevo      IN VARCHAR2,
    p_cambiado_por      IN VARCHAR2,
    p_comentario        IN CLOB
)
AS
BEGIN
    UPDATE HistorialEstado
    SET estado_anterior = p_estado_anterior,
        estado_nuevo    = p_estado_nuevo,
        cambiado_por    = p_cambiado_por,
        comentario      = p_comentario
    WHERE historial_id = p_historial_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20009,
            'Registro de historial no encontrado o inactivo.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_eliminar_historial(
    p_historial_id IN NUMBER
)
AS
BEGIN
    UPDATE HistorialEstado
    SET activo = 0
    WHERE historial_id = p_historial_id
      AND activo = 1;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(
            -20010,
            'Registro de historial no encontrado o ya eliminado.'
        );
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE sp_cambiar_estado_ticket(
    p_ticket_id      IN NUMBER,
    p_estado_nuevo   IN VARCHAR2,
    p_cambiado_por   IN VARCHAR2,
    p_comentario     IN CLOB
)
AS
    v_estado_actual VARCHAR2(20);
BEGIN

    SELECT estado
    INTO v_estado_actual
    FROM Tickets
    WHERE ticket_id = p_ticket_id
      AND activo = 1;

    UPDATE Tickets
    SET estado = p_estado_nuevo
    WHERE ticket_id = p_ticket_id;

    INSERT INTO HistorialEstado(
        ticket_id,
        estado_anterior,
        estado_nuevo,
        cambiado_por,
        comentario
    )
    VALUES(
        p_ticket_id,
        v_estado_actual,
        p_estado_nuevo,
        p_cambiado_por,
        p_comentario
    );

    COMMIT;

END;
/