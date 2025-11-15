import { createApp } from 'vue';
import { createPinia } from 'pinia'; // <-- 1. Importar Pinia
import App from './App.vue';
import router from './router'; // <-- 2. Importar el Router
import 'bootstrap/dist/css/bootstrap.min.css'

import Echo from 'laravel-echo' // Importá Echo
import Pusher from 'pusher-js' // 👈 Importá PUSHER (no Reverb)

window.Pusher = Pusher // 👈 Hacelo global para que Echo lo encuentre

// Leemos las variables del .env de Laravel
// (Asegurate que tu .env de Laravel tenga VITE_REVERB_... correctos)
const VITE_REVERB_APP_KEY = import.meta.env.VITE_REVERB_APP_KEY;
const VITE_REVERB_HOST = import.meta.env.VITE_REVERB_HOST;
// ⚠️ OJO ACÁ: Esta variable debe apuntar al puerto 9000 en tu .env
const VITE_REVERB_PORT = import.meta.env.VITE_REVERB_PORT;
const VITE_REVERB_SCHEME = import.meta.env.VITE_REVERB_SCHEME;

window.Echo = new Echo({
    broadcaster: 'reverb', // 👈 ¡Así se le dice que use Reverb!
    key: VITE_REVERB_APP_KEY,
    wsHost: VITE_REVERB_HOST,
    wsPort: VITE_REVERB_PORT,
    wssPort: VITE_REVERB_PORT,
    forceTLS: VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
});

const app = createApp(App);

app.use(createPinia()); // <-- 3. Usar Pinia
app.use(router); // <-- 4. Usar el Router

app.mount('#app');
