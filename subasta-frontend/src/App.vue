<script setup>
import { onMounted, computed } from 'vue';
import { useSubastaStore } from './stores/subasta'; // Importamos nuestro store
import logoSubasta from './assets/images/logo-subasta.svg';
const subastaStore = useSubastaStore(); // Creamos una instancia del store

// Cuando el componente se monta, cargamos las subastas
onMounted(async () => {
  await subastaStore.cargarSubastas();
  // Después de cargar, si hay subastas, empezamos a escuchar la primera
  if (subastaStore.subastas.length > 0) {
    subastaStore.escucharSubasta(subastaStore.subastas[0].id);
  }
});

// Usamos una propiedad computada para mostrar el precio actual
const precioEnPantalla = computed(() => {
  if (subastaStore.subastaActiva) {
    return subastaStore.precioActual.toFixed(2); // Formateamos a 2 decimales
  }
  return 'N/A';
});
</script>

<template>
  <div class="contenedor-principal">
    <img :src="logoSubasta" alt="Logo de Subasta" class="logo-superior" />
    <h1>Subastas en Vivo</h1>

    <div v-if="subastaStore.cargando" class="mensaje-cargando">Cargando subastas...</div>
    <div v-else-if="subastaStore.error" class="mensaje-error">{{ subastaStore.error }}</div>
    <div v-else-if="!subastaStore.subastaActiva" class="mensaje-info">No hay subastas activas.</div>

    <div v-else class="tarjeta-subasta">
      <h2>{{ subastaStore.subastaActiva.nombre_vendedor }}</h2>
      <p>{{ subastaStore.subastaActiva.descripcion }}</p>

      <div class="precio-actual">
        Precio Actual: <span class="monto">${{ precioEnPantalla }}</span>
      </div>

      <div class="lista-ofertas">
        <h3>Ofertas Recientes:</h3>
        <ul v-if="subastaStore.ofertas.length > 0">
          <li v-for="oferta in subastaStore.ofertas" :key="oferta.id">
            DNI: {{ oferta.dni }} - Monto: ${{ parseFloat(oferta.monto).toFixed(2) }}
          </li>
        </ul>
        <p v-else>Sé el primero en ofertar!</p>
      </div>

      <p class="info-adicional">Fecha: {{ new Date(subastaStore.subastaActiva.fecha_realizacion).toLocaleString() }}</p>
    </div>
  </div>
</template>

<style scoped>
.logo-superior {
  max-width: 150px;
  height: auto;
  margin-bottom: 20px; /* Espacio entre el logo y el título */
}
.contenedor-principal {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.tarjeta-subasta {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 25px;
  margin-top: 20px;
}

.tarjeta-subasta h2 {
  color: #007bff;
  margin-bottom: 15px;
}

.tarjeta-subasta p {
  color: #555;
  line-height: 1.6;
}

.precio-actual {
  font-size: 2em;
  font-weight: bold;
  color: #28a745; /* Verde para el precio */
  margin: 20px 0;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.monto {
  color: #dc3545; /* Rojo para el monto */
}

.lista-ofertas {
  text-align: left;
  margin-top: 30px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 5px;
}

.lista-ofertas h3 {
  color: #495057;
  margin-bottom: 10px;
}

.lista-ofertas ul {
  list-style-type: none;
  padding: 0;
}

.lista-ofertas li {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 4px;
}

.mensaje-cargando, .mensaje-error, .mensaje-info {
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}

.mensaje-cargando {
  background-color: #e0f7fa;
  color: #006064;
}

.mensaje-error {
  background-color: #ffebee;
  color: #c62828;
}

.mensaje-info {
  background-color: #e3f2fd;
  color: #1565c0;
}
</style>
