INSERT INTO Categorias (nombre, descripcion)
VALUES (
    'Hardware',
    'Problemas relacionados con equipos físicos.'
);

INSERT INTO Categorias (nombre, descripcion)
VALUES (
    'Software',
    'Errores de aplicaciones o sistemas.'
);

INSERT INTO Categorias (nombre, descripcion)
VALUES (
    'Redes',
    'Problemas de conectividad e infraestructura.'
);

INSERT INTO Categorias (nombre, descripcion)
VALUES (
    'Accesos',
    'Restablecimiento de contraseñas y permisos.'
);

INSERT INTO Clientes (
    nombre,
    email,
    telefono,
    compania,
    password_hash
)
VALUES (
    'Juan Perez',
    'juan.perez@empresa.com',
    '4421234567',
    'Empresa ABC',
    '$2b$10$etCQnYLrs68o5AispRNzvegMMjOr3Ow9bJfToE.MpmvKOkHlzxXG2'
);

INSERT INTO Clientes (
    nombre,
    email,
    telefono,
    compania,
    password_hash
)
VALUES (
    'Maria Lopez',
    'maria.lopez@empresa.com',
    '4429876543',
    'Empresa ABC',
    '$2b$10$maWpF33A25xAxzuCYkQORue5X2nd6bN9JsrSwx7cBYki/PT/FIcIG'
);

INSERT INTO Clientes (
    nombre,
    email,
    telefono,
    compania,
    password_hash
)
VALUES (
    'Carlos Ramirez',
    'carlos.ramirez@empresa.com',
    '5551112233',
    'Tech Solutions',
    '$2b$10$3KWHLJzDZKpyeu.M3VYfFufQO/2IG9DlYKN5I9svG81cmzhkX2RQu'
);

INSERT INTO Clientes (
    nombre,
    email,
    telefono,
    compania,
    password_hash
)
VALUES (
    'Ana Torres',
    'ana.torres@empresa.com',
    '5554445566',
    'Consulting Group',
    '$2b$10$EERBcALnfZw2xXBw/om7ruO.EFzadHBs1evIKhfNTNJ62oSKy6bl2'
);

INSERT INTO Agentes (
    nombre,
    email,
    departamento,
    password_hash
)
VALUES (
    'Luis Hernandez',
    'luis.hernandez@soporte.com',
    'Mesa de Ayuda',
    '$2b$10$i8lrFdTi1CULah2AwgKW6u0mVNkui1cG9UC8gPG/kYxlY/YJki2jO'
);

INSERT INTO Agentes (
    nombre,
    email,
    departamento,
    password_hash
)
VALUES (
    'Sofia Martinez',
    'sofia.martinez@soporte.com',
    'Infraestructura',
    '$2b$10$v.GSk5qpa6BiEP2XyVLNlexBCmTqsQI6EoUw0XtsG.caaa12pFaBm'
);

INSERT INTO Agentes (
    nombre,
    email,
    departamento,
    password_hash
)
VALUES (
    'Pedro Gomez',
    'pedro.gomez@soporte.com',
    'Aplicaciones',
    '$2b$10$TZfMPAhdRBYgT5NtO.jNy.wSvBVOISIiMb1dqRerGfuXiKLUAGMQu'
);

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
    1,
    1,
    1,
    'Equipo no enciende',
    'La computadora no responde al intentar encenderla.',
    'Alta',
    'Abierto'
);

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
    2,
    3,
    2,
    'Error al abrir sistema',
    'La aplicación muestra un error al iniciar sesión.',
    'Media',
    'En Proceso'
);

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
    3,
    2,
    3,
    'Sin acceso a internet',
    'No hay conectividad desde la oficina principal.',
    'Critica',
    'Resuelto'
);

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
    4,
    NULL,
    4,
    'Recuperacion de contraseña',
    'El usuario olvidó su contraseña.',
    'Baja',
    'Abierto'
);

INSERT INTO HistorialEstado (
    ticket_id,
    estado_anterior,
    estado_nuevo,
    cambiado_por,
    comentario
)
VALUES (
    1,
    NULL,
    'Abierto',
    'Sistema',
    'Ticket creado.'
);

INSERT INTO HistorialEstado (
    ticket_id,
    estado_anterior,
    estado_nuevo,
    cambiado_por,
    comentario
)
VALUES (
    2,
    'Abierto',
    'En Proceso',
    'Pedro Gomez',
    'Se inició la revisión.'
);

INSERT INTO HistorialEstado (
    ticket_id,
    estado_anterior,
    estado_nuevo,
    cambiado_por,
    comentario
)
VALUES (
    3,
    'En Proceso',
    'Resuelto',
    'Sofia Martinez',
    'Se restableció la conectividad.'
);

INSERT INTO HistorialEstado (
    ticket_id,
    estado_anterior,
    estado_nuevo,
    cambiado_por,
    comentario
)
VALUES (
    4,
    NULL,
    'Abierto',
    'Sistema',
    'Ticket creado.'
);