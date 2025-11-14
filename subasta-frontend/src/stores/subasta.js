// src/stores/subasta.js
import { defineStore } from 'pinia';
import apiClient from '../api'; // 👈 Importamos nuestro cliente Axios

export const useSubastaStore = defineStore('subasta', {
  state: () => ({
    subastas: [], // Para guardar la lista de subastas
    subastaActiva: null, // Para la subasta que estamos viendo
    ofertas: [], // Para las ofertas de la subasta activa
    precioActual: 0, // El precio más alto hasta ahora
    cargando: false,
    error: null,
  }),

  actions: {
    async cargarSubastas() {
      this.cargando = true;
      this.error = null;
      try {
        const response = await apiClient.get('/subastas');
        this.subastas = response.data;
        // Para la prueba, simplemente selecciona la primera subasta
        if (this.subastas.length > 0) {
          this.subastaActiva = this.subastas[0];
          this.precioActual = this.subastas[0].precio_inicial;
        }
      } catch (error) {
        this.error = 'Error al cargar las subastas.';
        console.error(error);
      } finally {
        this.cargando = false;
      }
    },

    // Cuando llega una nueva oferta por WebSocket
    procesarNuevaOferta(oferta) {
      if (this.subastaActiva && oferta.subasta_id === this.subastaActiva.id) {
        this.ofertas.push(oferta);
        if (parseFloat(oferta.monto) > this.precioActual) {
          this.precioActual = parseFloat(oferta.monto);
        }
      }
    },

    // Método para "activar" la escucha de sockets para una subasta
    escucharSubasta(subastaId) {
      // Si ya estábamos escuchando otra, la dejamos de escuchar
      if (this.subastaActiva && this.subastaActiva.id !== subastaId) {
        window.Echo.leave('nueva-subasta.' + this.subastaActiva.id);
      }

      // Buscamos la subasta y la ponemos como activa
      const subasta = this.subastas.find(s => s.id === subastaId);
      if (subasta) {
        this.subastaActiva = subasta;
        // Configuramos el precio inicial o la oferta más alta si ya tiene
        this.precioActual = subasta.precio_inicial; // Por simplicidad, asumimos esto.
                                                 // En un caso real, harías una petición para obtener
                                                 // las ofertas de esa subasta y sacar el monto máximo.

        // Nos suscribimos al canal de Reverb
        window.Echo.channel('nueva-subasta.' + subastaId)
          .listen('NuevaOfertaRegistrada', (e) => {
            console.log('¡Nueva oferta recibida por WebSocket!', e.oferta);
            this.procesarNuevaOferta(e.oferta);
          });
      }
    },
  },
});
