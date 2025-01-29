
# Proyecto Microservicios con Nestjs y Frontend con React

Este proyecto consiste en una arquitectura de microservicios utilizando NestJS para el backend y React para el frontend. Incluye un API Gateway que gestiona las conexiones entre los servicios de usuario (`user-service`) y tareas (`task-service`), junto con una base de datos PostgreSQL alojada en la nube.

## Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)
- Git
- NestJS CLI (opcional)
- PostgreSQL (solo para desarrollo local, no requerido en este caso)

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/alfeizar/domina.git
cd domina
```

### 2. Configurar servidores (backend)
2.1 Ingresar a la carpeta de servidores:
```bash
  cd servidores
```
2.2 Instalar dependencias para cada servicio:
```bash
# API Gateway
cd api-gateway && npm install && cd ..

# User Service
cd user-service && npm install && cd ..

# Task Service
cd task-service && npm install && cd ..
```

2.3. Ejecutar servicios (en terminales separadas):

● **User Service** (puerto 3001):
```bash
cd user-service
npm run start:dev
```

● **task Service** (puerto 3002):
```bash
cd task-service
npm run start:dev
```


● **API Gateway** (puerto 3000):
```bash
cd api-gateway
npm run start:dev
```

### 3. Configurar Frontend (React)
3.1 Ingresar a la carpeta del frontend:
```bash
cd ../front
```
3.2 Instalar dependencias:
```bash
npm install
```
3.3 Iniciar la aplicación:
```bash
npm run dev
```


### Notas Importantes  

- **Rendimiento de la base de datos:**  
  La base de datos está alojada en un servicio gratuito en la nube, lo que puede ocasionar latencia en las respuestas.  

- **Puertos:**  
  Asegúrate de que los puertos **3000-3002** estén disponibles antes de ejecutar los servicios.  

- **Variables de entorno:**  
  Si se requiere configuración local de la base de datos, dale una mirada a el archivo `.env` de cada microservicio y solo cambia las credenciales.  
