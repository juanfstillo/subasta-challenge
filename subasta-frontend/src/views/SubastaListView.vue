<template>
    <div class="d-flex flex-column align-items-center justify-content-center py-4">
      <img :src="logoSubasta" alt="Logo de Subasta" class="logo-superior mb-4" />
    </div>



  <div class="container my-5">
     <router-link to="/" class="btn btn-outline-secondary mb-4">
      &larr; Volver a Home
    </router-link>
    <h1 class="mb-4">Subastas Disponibles</h1>

    <div v-if="store.isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando subastas...</span>
      </div>
      <p>Cargando subastas...</p>
    </div>

    <div v-else class="row g-4">

      <div
        v-for="subasta in store.subastas"
        :key="subasta.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">

            <h5 class="card-title">{{ subasta.descripcion }}</h5>

            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item px-0">
                Precio base: <span class="fw-bold text-success">${{ subasta.precio_inicial }}</span>
              </li>
              <li class="list-group-item px-0">
                Inicio: <span class="text-muted">{{ subasta.fecha_realizacion }}</span>
              </li>
            </ul>

            <router-link
              :to="`/subastas/${subasta.id}`"
              class="btn btn-primary mt-auto"
            >
              Ingresar a la Subasta
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="!store.isLoading && store.subastas.length === 0" class="col-12">
        <div class="alert alert-info" role="alert">
          No hay subastas disponibles en este momento.
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSubastaStore } from '../stores/subastaStore';
import logoSubasta from '../assets/images/logo-subasta.svg';


// (No es necesario importar RouterLink, Vue Router lo hace global)

const store = useSubastaStore();

onMounted(() => {
  store.fetchSubastas();
});
</script>

<style scoped>

.card {
  /* Podrías poner alguna personalización MÍNIMA que Bootstrap no tenga */
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.03);
}
</style>
