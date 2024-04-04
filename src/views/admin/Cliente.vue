<template>
<div class="card">
    <h1>Clientes</h1>
    <DataTableComponent :data="clientes" :columns="columnas" />
</div>
</template>

<script setup>
import DataTableComponent from "@/components/admin/DataTableComponent.vue"
import { onMounted, ref } from "vue"

import clienteService from "../../services/cliente.service";

const clientes = ref([]);
const columnas = [
    {"label": "ID", "key": "id"},
    {"label": "NOMBRE COMPLETO", "key": "nombre_completo"},
    {"label": "CI / NIT", "key": "ci_nit"},
    {"label": "TELEFONO", "key": "telefono"},
]

onMounted(()=> {
    listaClientes()
})

const listaClientes = async () =>{
    const {data} = await clienteService.listar();
    clientes.value = data
    
}
</script>
