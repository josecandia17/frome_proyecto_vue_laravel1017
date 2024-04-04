<template>
<div class="card">
    <h1>Usuario</h1>
    <DataTableComponent :data="usuarios" :columns="columnas" />
</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DataTableComponent from "@/components/admin/DataTableComponent.vue"
import usuarioService from "../../services/usuario.service";


const usuarios = ref([]);
const columnas = [
    {"label": "ID", "key": "id"},
    {"label": "NOMBRE", "key": "name"},
    {"label": "CORREO ELECTRONICO", "key": "email"},
]

onMounted(()=> {
    listaUsuarios()
})

const listaUsuarios = async () =>{
    const {data} = await usuarioService.listar();

    usuarios.value = data

}
</script>
