<template>
  <div class="card" v-if="perfil">
    <h1>CORREO: {{perfil.email}}</h1>
    <h1>NOMBRE: {{perfil.name}}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
import authService from "../services/auth.service";

const perfil = ref(null)

async function funPerfil (){
  const {data} = await authService.getPerfil();
  perfil.value = data

}

funPerfil()
 

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
