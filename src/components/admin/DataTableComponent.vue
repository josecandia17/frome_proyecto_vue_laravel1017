<template>
    <DataTable :value="props.data">
  
      <Column v-for="col in props.columns" :field="col.key" :header="col.label" :key="col.id"></Column>
      
      <Column headerStyle="min-width:3rem;">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-warning mr-2"
            @click="alert(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </template>
  
  <script setup>
  const props = defineProps(["data", "columns"]);
  </script>