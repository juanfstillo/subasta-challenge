<template>
  <div class="container text-center py-5">
    <img :src="logoSubasta" alt="Logo de Subasta" />
    <h1 class="mb-3 pt-1">Bienvenido a Subasta Online</h1>
    <p class="mb-4">¡A la hora de realizar una subasta solo confíe sólo en el especialista!</p>
    <router-link to="/subastas" class="btn btn-primary btn-lg">
      Ver Subastas
    </router-link>
  </div>
</template>

<script setup>
import logoSubasta from '../assets/images/logo-subasta.svg';
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
</style>
