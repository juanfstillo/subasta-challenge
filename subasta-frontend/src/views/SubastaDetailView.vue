<template>
  <div class="container my-5">

    <router-link to="/subastas" class="btn btn-outline-secondary mb-4">
      &larr; Volver al listado
    </router-link>

    <div v-if="store.isLoadingDetail" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-if="!store.isLoadingDetail && store.subastaActual" class="card shadow-lg">
      <div class="card-header bg-primary text-white">
        <h2 class="h4 mb-0">Detalle de la Subasta</h2>
      </div>
      <div class="card-body">
        <h1 class="card-title">{{ store.subastaActual.descripcion }}</h1>

        <ul class="list-group list-group-flush mt-4">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Precio Inicial:
            <span class="badge bg-success rounded-pill fs-5">
              ${{ store.subastaActual.precio_inicial }}
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

      <div class="card-footer p-4">
        <h3 class="h5">Realizar una Puja</h3>
        <p>¡Próximamente!</p>
        </div>
    </div>

    <div v-if="!store.isLoadingDetail && !store.subastaActual" class="alert alert-danger">
      No se pudo cargar la información de la subasta.
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'; // ¡Importante para saber el ID!
import { useSubastaStore } from '../stores/subastaStore';

// 1. Inicializamos el store
const store = useSubastaStore();

// 2. Inicializamos el 'route' para acceder a los parámetros de la URL
const route = useRoute();

// 3. Cuando el componente se carga (onMounted)...
onMounted(() => {
  // 4. Obtenemos el 'id' de la URL (viene del router /subastas/:id)
  const subastaId = route.params.id;

  // 5. Le pedimos al store que traiga esa subasta
  store.fetchSubasta(subastaId);
});

</script>

<style scoped>
/* Podemos agregar estilos sutiles */
.card {
  border: none;
}
</style>
