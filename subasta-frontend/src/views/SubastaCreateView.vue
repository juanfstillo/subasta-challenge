<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center mb-3">
          <img :src="logoSubasta" alt="Logo de Subasta" class="img-fluid" style="max-height: 100px;" />
        </div>
        <router-link to="/subastas" class="btn btn-outline-secondary mb-4">
          &larr; Volver al listado
        </router-link>
        <h1 class="mb-4">Crear Nueva Subasta</h1>

        <form @submit.prevent="handleSubmit" class="card p-4 shadow-sm">

          <div class="mb-3">
            <label for="nombre_vendedor" class="form-label">Tu Nombre</label>
            <input
              type="text"
              class="form-control"
              id="nombre_vendedor"
              v-model="formData.nombre_vendedor"
              required
            >
          </div>

          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción del Producto</label>
            <textarea
              class="form-control"
              id="descripcion"
              rows="3"
              v-model="formData.descripcion"
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="precio_inicial" class="form-label">Precio Inicial</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input
                type="number"
                class="form-control"
                id="precio_inicial"
                v-model.number="formData.precio_inicial"
                min="1"
                required
              >
            </div>
          </div>

          <div class="mb-3">
            <label for="fecha_realizacion" class="form-label">Fecha de Inicio</label>
            <input
              type="datetime-local"
              class="form-control"
              id="fecha_realizacion"
              v-model="formData.fecha_realizacion"
              required
            >
          </div>

          <div v-if="store.createError" class="alert alert-danger mt-3">
            <h5 class="alert-heading">Error de Validación</h5>
            <p>{{ store.createError.message }}</p>
            <ul v-if="store.createError.errors">
              <li v-for="(error, field) in store.createError.errors" :key="field">
                {{ error[0] }}
              </li>
            </ul>
          </div>

          <div class="d-flex justify-content-end mt-3">
            <router-link to="/subastas" class="btn btn-outline-secondary me-2">
              Cancelar
            </router-link>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="store.isCreating"
            >
              <span v-if="store.isCreating" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Guardar Subasta</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSubastaStore } from '../stores/subastaStore';
import { useRouter } from 'vue-router';
import logoSubasta from '../assets/images/logo-subasta.svg';


const store = useSubastaStore();
const router = useRouter(); // Instancia del router

// 1. Estado local para el formulario
const formData = ref({
  nombre_vendedor: '',
  descripcion: '',
  precio_inicial: 1,
  fecha_realizacion: '',
});

// 2. Función de envío
const handleSubmit = async () => {
  // Llamamos a la nueva acción del store
  const success = await store.createSubasta(formData.value);

  if (success) {
    // Si salió bien, volvemos a la lista
    router.push('/subastas');
  }
};
</script>
