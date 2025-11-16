import { defineStore } from 'pinia';
import SubastaService from '../services/subastaService';

export const useSubastaStore = defineStore('subasta', {

  // 1. STATE: Aquí "viven" los datos
  state: () => ({
    subastas: [],
    subastaActual: null,
    isLoading: false,
    isLoadingDetail: false,
    isSubmittingBid: false,
    bidError: null,
    isCreating: false,
    createError: null,// Para mostrar un "Cargando..."
  }),

  // 2. ACTIONS: Son métodos que modifican el state.
  actions: {

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
    },

    async realizarPuja(monto, dni) {
      if (!this.subastaActual) return;

      this.isSubmittingBid = true;
      this.bidError = null;

      try {
        // 1. Llama al servicio. La respuesta será la 'oferta' (o 201)
        await SubastaService.realizarPuja(this.subastaActual.id, monto, dni);

        // 2. ¡ÉXITO! No nos importa la respuesta.
        // Simplemente volvemos a pedir los datos de la subasta.
        // Esto la actualizará con el precio_actual (si lo calculas)
        // y la nueva lista de ofertas.
        await this.fetchSubasta(this.subastaActual.id);

      } catch (error) {
        // 3. Manejo de error (tu backend devuelve 422)
        if (error.response && error.response.status === 422) {
          const errors = error.response.data;
          if (errors.monto) {
            this.bidError = errors.monto[0]; // Ej: "El monto debe ser mayor a 1500"
          } else if (errors.dni) {
            this.bidError = errors.dni[0];
          } else {
            this.bidError = "Error de validación.";
          }
        } else {
          this.bidError = 'Ocurrió un error inesperado al realizar la puja.';
        }
        console.error('Error al realizar la puja:', error);
      } finally {
        this.isSubmittingBid = false;
      }
    },

    async createSubasta(data) {
      this.isCreating = true;
      this.createError = null;

      try {
        // 1. Llama al servicio
        await SubastaService.createSubasta(data);

        // 2. ¡Éxito!
        this.isCreating = false;

        // 3. (Opcional) Refrescamos la lista de subastas para la próxima vez
        this.fetchSubastas();

        return true; // Devuelve 'true' para que el formulario sepa que salió bien

      } catch (error) {
        // 4. Manejo de error (ej: 422 Validación)
        this.isCreating = false;
        if (error.response && error.response.status === 422) {
          // Guardamos los errores de validación de Laravel
          this.createError = error.response.data;
        } else {
          this.createError = { message: 'Ocurrió un error inesperado.' };
        }
        console.error('Error al crear la subasta:', error);
        return false; // Devuelve 'false' para el formulario
      }
    }

  }
});
