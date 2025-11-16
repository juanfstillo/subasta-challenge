Sistema de Subastas (Laravel + Vue)Este repositorio contiene el código fuente para una aplicación de sistema de subastas en tiempo real. El proyecto está estructurado en un "monorepo" que contiene dos proyectos separados:/backend: Una API de Laravel 11+ que utiliza Sail, Reverb para WebSockets y Queues./frontend: Una aplicación SPA (Single Page Application) construida con Vue.js 3 y Vite.🏗️ Estructura de Carpetas/
├── backend/ (Proyecto Laravel / API)
├── frontend/ (Proyecto Vue.js / Cliente)
└── README.md (¡Estás aquí!)
🛠️ PrerrequisitosAntes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu sistema:Docker Desktop: Indispensable para que funcione Laravel Sail.Node.js y npm: (v18 o superior) Para el frontend con Vite.Composer: Para instalar las dependencias de PHP la primera vez.🏁 Instalación por Primera VezSi estás clonando este repositorio por primera vez, sigue estos pasos para configurar ambos entornos.1. Configuración del Backend (Laravel / Sail)Debes inicializar las dependencias y el entorno de Sail.# 1. Navega a la carpeta del backend
cd backend

# 2. Instala las dependencias de Composer

composer install

# 3. Copia el archivo de entorno

# (Aquí deberás configurar tu base de datos y las claves de Reverb)

cp .env.example .env

# 4. Levanta los contenedores de Sail por primera vez

./vendor/bin/sail up -d

# 5. Genera la clave de la aplicación

./vendor/bin/sail artisan key:generate

# 6. Ejecuta las migraciones de la base de datos

./vendor/bin/sail artisan migrate 2. Configuración del Frontend (Vue / Vite)El frontend necesita saber dónde encontrar la API del backend.# 1. Abre una NUEVA TERMINAL y navega a la carpeta del frontend
cd frontend

# 2. Instala las dependencias de Node

npm install

# 3. (Opcional pero recomendado)

# Crea un archivo .env.local si necesitas sobreescribir la URL de la API

# Ej: VITE_API_URL=http://localhost:8000

🚀 Cómo Correr el Entorno de DesarrolloPara que la aplicación funcione completamente (con actualizaciones en tiempo real), necesitarás 4 terminales abiertas.Terminal 1: Servicios de Sail (Base de Datos y Web)Inicia los contenedores principales de Docker (servidor web, base de datos, Redis) en modo "detached" (background).# Navega a la carpeta del backend
cd backend

# Levanta los servicios

./vendor/bin/sail up -d
Terminal 2: Servidor de WebSockets (Reverb)Inicia el servidor de Reverb para manejar las conexiones de WebSockets en tiempo real.# Navega a la carpeta del backend
cd backend

# Inicia Reverb

./vendor/bin/sail artisan reverb:start
Terminal 3: Procesador de Colas (Queues)Inicia el "worker" de colas. Este proceso es fundamental para trabajos en segundo plano (como notificaciones, o tu evento NuevaOfertaRegistrada).# Navega a la carpeta del backend
cd backend

# Inicia el "queue worker"

./vendor/bin/sail artisan queue:work
Terminal 4: Servidor del Frontend (Vite)Inicia el servidor de desarrollo de Vite, que compilará tu aplicación Vue y la servirá con hot-reload.# Navega a la carpeta del frontend
cd frontend

# Inicia el servidor de desarrollo

npm run dev
Summary de AccesoUna vez que los 4 procesos estén corriendo:Tu Aplicación (Frontend): http://localhost:5173Tu API (Backend): http://localhost:8000 (o la URL de tu APP_URL en .env de Sail)Para detener todos los servicios del backend (Terminal 1), puedes navegar a /backend y ejecutar:./vendor/bin/sail down
