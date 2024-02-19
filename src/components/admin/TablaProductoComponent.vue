<template>
  <DataTable :value="props.data">
    <Column field="id" header="ID"></Column>
    <Column field="nombre" header="NOMBRE"></Column>
    <Column field="precio" header="PRECIO"></Column>
    <Column field="stock" header="STOCK"></Column>
    <Column headerStyle="min-width:3rem;">
      <template #body="slotProps">
        <Button
          icon="pi pi-plus"
          class="p-button-rounded p-button-warning mr-2"
          @click="agregar(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script setup>
const props = defineProps(["nombre", "data"]);
const emit = defineEmits(["funCarrito"]);

function agregar(prod) {
  emit("funCarrito", prod);
}
</script>
