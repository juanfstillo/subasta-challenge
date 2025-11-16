<template>
  <div class="container my-5">

    <router-link to="/subastas" class="btn btn-outline-secondary mb-4">
      &larr; Volver al listado
    </router-link>

    <!-- 1. ESTADO DE CARGA -->
    <div v-if="store.isLoadingDetail" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- 2. CONTENIDO PRINCIPAL DE LA SUBASTA -->
    <div v-if="!store.isLoadingDetail && store.subastaActual" class="card shadow-lg">
      <div class="card-header bg-primary text-white">
        <h2 class="h4 mb-0">Detalle de la Subasta</h2>
      </div>
      <div class="card-body">
        <h1 class="card-title">{{ store.subastaActual.descripcion }}</h1>

        <ul class="list-group list-group-flush mt-4">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Precio Inicial:
            <span class="text-muted fs-6">
              ${{ store.subastaActual.precio_inicial }}
            </span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Precio Actual (Mejor oferta):
            <!-- El 'precioActual' lo calculamos en el script -->
            <span class="badge bg-success rounded-pill fs-5">
              ${{ precioActual }}
            </span>
          </li>
          <li class="list-group-item">
            Fecha de Realización:
            <strong>{{ store.subastaActual.fecha_realizacion }}</strong>
          </li>
          <li class="list-group-item">
            Estado:
            <span class="text-capitalize">{{ store.subastaActual.estado || 'Activa' }}</span>
          </li>
        </ul>
      </div>

      <!-- 3. FORMULARIO DE PUJA (REEMPLAZO DE "PRÓXIMAMENTE") -->
      <div class="card-footer p-4">
        <h3 class="h5">Realizar una Oferta</h3>

        <form @submit.prevent="handleSubmitPuja">

          <div class="mb-3">
            <label for="dni" class="form-label">Tu DNI:</label>
            <input
              type="text"
              class="form-control"
              id="dni"
              v-model="dni"
              placeholder="Ingresa tu DNI sin puntos"
              required
            >
          </div>

          <div class="mb-3">
            <label for="montoPuja" class="form-label">Tu monto (Mín: ${{ minPuja }})</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input
                type="number"
                class="form-control"
                id="montoPuja"
                v-model.number="monto"
                :min="minPuja"
                required
              >
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="store.isSubmittingBid"
          >
            <span v-if="store.isSubmittingBid" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Realizar Oferta</span>
          </button>
        </form>

        <!-- Mensaje de Error -->
        <div v-if="store.bidError" class="alert alert-danger mt-3">
          {{ store.bidError }}
        </div>
      </div>
    </div>

    <!-- 4. HISTORIAL DE OFERTAS (NUEVA SECCIÓN) -->
    <div v-if="!store.isLoadingDetail && store.subastaActual && store.subastaActual.ofertas.length > 0" class="mt-5">
      <h3 class="mb-3">Historial de Ofertas</h3>
      <ul class="list-group">
        <li
          v-for="(oferta, index) in store.subastaActual.ofertas"
          :key="oferta.id"
          class="list-group-item d-flex justify-content-between align-items-center"
          :class="{ 'list-group-item-success': index === 0 }"
        >
          <div>
            <span class="fw-bold">{{ index === 0 ? 'Oferta Ganadora' : `Oferta #${index + 1}` }}</span>
            <small class="d-block text-muted">DNI:{{ oferta.dni }}</small>
          </div>
          <span class="fs-5 fw-bold">${{ oferta.monto }}</span>
        </li>
      </ul>
    </div>

    <!-- 5. ESTADO DE ERROR -->
    <div v-if="!store.isLoadingDetail && !store.subastaActual" class="alert alert-danger">
      No se pudo cargar la información de la subasta.
    </div>

  </div>
</template>

<script setup>
// ¡Importamos ref y computed!
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSubastaStore } from '../stores/subastaStore';

// 1. Inicializamos store y route
const store = useSubastaStore();
const route = useRoute();

// 2. Creamos las variables "reactivas" para el formulario
const monto = ref(0);
const dni = ref('');

// 3. Creamos valores calculados
const precioActual = computed(() => {
  if (!store.subastaActual || store.subastaActual.ofertas.length === 0) {
    return store.subastaActual?.precio_inicial || 0;
  }
  // Como el backend las ordena 'desc', la [0] es la más alta
  return store.subastaActual.ofertas[0].monto;
});

const minPuja = computed(() => {
  // La puja debe ser mayor que el precio actual
  // Tu backend ya valida 'gt:{$precioBase}', esto es solo una ayuda visual
  return parseFloat(precioActual.value) + 1;
});

// 4. Lógica de carga
onMounted(() => {
  const subastaId = route.params.id;
  // Pedimos la subasta, y CUANDO TERMINE (.then)...
  store.fetchSubasta(subastaId).then(() => {
    // ...ponemos el monto mínimo sugerido en el input
    monto.value = minPuja.value;
  });
});

// 5. Lógica de envío del formulario
const handleSubmitPuja = async () => {
  // Llamamos a la acción del store con los valores de los inputs
  await store.realizarPuja(monto.value, dni.value);

  // Si la puja fue exitosa (no hay error)...
  if (!store.bidError) {
    // ...reseteamos el monto al nuevo mínimo
    monto.value = minPuja.value;
    // (Dejamos el DNI por si el usuario quiere volver a pujar)
  }
};

</script>

<style scoped>
.card {
  border: none;
}
.list-group-item-success {
  border-left: 5px solid var(--bs-success);
}
</style>
