import apiClient from './apiClient';

export default {
  // Esta función llama a la ruta que creaste en Laravel
  getSubastas() {
    return apiClient.get('/api/subastas');
  },

  getSubasta(id) {
    return apiClient.get(`/api/subastas/${id}`);
  },

  realizarPuja(subastaId, monto, dni) {
    const payload = {
      monto: monto,
      dni: dni
    };
    return apiClient.post(`/api/subastas/${subastaId}/ofertas`, payload);
  }

  // En el futuro, aquí pondrías:
  // getSubasta(id) { return apiClient.get(`/api/subastas/${id}`); }
  // createSubasta(data) { return apiClient.post('/api/subastas', data); }
};
