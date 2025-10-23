# RPC Taller - Casos de Estudio

**Autor**: Pedro Echeverria A.

Este proyecto implementa un sistema RPC (Remote Procedure Call) simulado usando Node.js y Express, que demuestra diferentes casos de estudio para el manejo de tipos de datos y comunicación entre cliente y servidor.


## Características Implementadas

### Caso 1: Servicios con tipos de datos simples
- **OBTENER_UID(string nombre) → int**: Obtiene el UID de un usuario por su nombre
- **OBTENER_NOMBRE(int uid) → string**: Obtiene el nombre de usuario por su UID

### Caso 2: Tipos de datos compuestos
- **MISMO_GID**: Verifica si dos usuarios tienen el mismo GID
- **OBTENER_UGID**: Obtiene tanto UID como GID de un usuario

### Caso 3: Uso de tipo union (XDR)
- **CONSULTAR_USUARIO**: Devuelve diferentes tipos de datos según la consulta (simula union types)

### Caso 4: Vectores de tamaño variable
- **LISTAR_USUARIOS**: Retorna una lista de todos los usuarios del sistema

### Caso 5: Manejo de errores y limpieza de recursos
- **COMANDO_VALIDO**: Ejecuta un comando que funciona correctamente
- **COMANDO_INVALIDO**: Demuestra el manejo de errores cuando un comando falla

## Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar el servidor**:
   ```bash
   npm start
   ```
   O para desarrollo con auto-reload:
   ```bash
   npm run start:dev
   ```

3. **Acceder a la aplicación**:
   Abrir el navegador en `http://localhost:3000`

## Estructura del Proyecto

```
├── api/
│   ├── config/          # Configuraciones (CORS, etc.)
│   ├── controllers/     # Controladores RPC
│   ├── routes/         # Definición de rutas
│   └── index.ts        # Configuración de la API
├── index.html          # Interfaz web
├── index.ts           # Servidor principal
└── package.json       # Dependencias y scripts
```

## API Endpoints

Todos los endpoints utilizan el método POST y esperan un JSON con la siguiente estructura:

```json
{
  "method": "NOMBRE_DEL_METODO",
  "params": {
    "parametro1": "valor1",
    "parametro2": "valor2"
  }
}
```

### Endpoints disponibles:

- `POST /api/v1/consul/getCaso1-Rcp` - Caso 1: Tipos simples
- `POST /api/v1/consul/getCaso2` - Caso 2: Tipos compuestos
- `POST /api/v1/consul/getCaso3XDR` - Caso 3: Union types
- `POST /api/v1/consul/getCaso4Vectores` - Caso 4: Vectores
- `POST /api/v1/consul/getCaso5Errores` - Caso 5: Manejo de errores

## Uso de la Interfaz Web

La interfaz web permite probar todos los casos de estudio de manera interactiva:

1. **Caso 1**: Ingresa un nombre de usuario para obtener su UID, o un UID para obtener el nombre
2. **Caso 2**: Compara GIDs de dos usuarios o obtiene UID/GID de un usuario
3. **Caso 3**: Prueba consultas con diferentes tipos de datos
4. **Caso 4**: Lista todos los usuarios del sistema
5. **Caso 5**: Prueba comandos válidos e inválidos para ver el manejo de errores

## Notas Técnicas

- **Compatibilidad multiplataforma**: El proyecto funciona tanto en Windows como en Unix/Linux
- **Windows**: Utiliza datos simulados para demostrar la funcionalidad RPC
- **Unix/Linux**: Utiliza comandos del sistema (`id`, `getent`, `cut`, etc.)
- Los errores se manejan de manera consistente con códigos de estado HTTP apropiados
- La interfaz utiliza Bootstrap para un diseño responsive y moderno

## Datos Simulados (Windows)

El proyecto incluye datos simulados para funcionar en Windows:

- **root** (UID: 0, GID: 0)
- **administrator** (UID: 500, GID: 500)  
- **usuario1** (UID: 1000, GID: 1000)
- **usuario2** (UID: 1001, GID: 1000)
- **test** (UID: 1002, GID: 1002)
- **admin** (UID: 1003, GID: 1000)

## Dependencias Principales

- **Express**: Framework web para Node.js
- **TypeScript**: Lenguaje de programación tipado
- **CORS**: Manejo de políticas de CORS
- **Bootstrap**: Framework CSS para la interfaz
