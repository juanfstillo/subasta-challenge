import { defineStore } from 'pinia';
import SubastaService from '../services/subastaService';

// defineStore('ID_UNICO_DEL_STORE', { ...config... })
export const useSubastaStore = defineStore('subasta', {

  // 1. STATE: Aquí "viven" los datos
  state: () => ({
    subastas: [], // Aquí guardaremos la lista de la API
    isLoading: false, // Para mostrar un "Cargando..."
  }),

  // 2. ACTIONS: Son métodos que modifican el state.
  actions: {
    // Esta es la función que llamaremos desde nuestra vista
    async fetchSubastas() {
      this.isLoading = true; // Empezamos a cargar

      try {
        // Llama al servicio que creamos
        const response = await SubastaService.getSubastas();

        // Guarda la respuesta en el state
        this.subastas = response.data;

      } catch (error) {
        console.error('Error al obtener subastas:', error);
        // Aquí podrías guardar el error en el state también
      } finally {
        this.isLoading = false; // Terminamos de cargar
      }
    },

    async fetchSubasta(id) {
      this.isLoadingDetail = true;
      this.subastaActual = null; // Resetea por si había una cargada antes
      try {
        const response = await SubastaService.getSubasta(id);
        this.subastaActual = response.data; // ¡Guardamos la subasta!
      } catch (error) {
        console.error('Error al obtener la subasta:', error);
      } finally {
        this.isLoadingDetail = false;
      }
    }
  }
});
