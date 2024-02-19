<template>
    <div class="card">
      <h1>Lista Pedido</h1>
      <DataTable :value="pedidos">
        <Column field="id" header="ID"></Column>
        <Column field="fecha" header="FECHA"></Column>
        <Column field="observacion" header="OBSERVACION"></Column>
        <Column field="cliente.nombre_completo" header="CLIENTE"></Column>
        <Column field="user.email" header="USUARIO"></Column>
        <Column headerStyle="min-width:3rem;">
          <template #body="slotProps">
            <Button
              label="Productos"
              icon="pi pi-product"
              @click="verProductos(slotProps.data)"
            />
  
            <Button
              icon="pi pi-print"
              class="p-button-rounded p-button-warning mr-2"
              @click="generarPDF(slotProps.data)"
            />
            
          </template>
        </Column>
      </DataTable>
  
      <Dialog
        v-model:visible="visibleProductos"
        modal
        header="Pedido"
        :style="{ width: '50vw' }"
        class="p-fluid"
      >
        <h4>FECHA: {{ pedido.fecha }}</h4>
        <h4>CLIENTE: {{ pedido.cliente.nombre_completo }}</h4>
        <h4>ATENDIDO POR: {{ pedido.user.email }}</h4>
  
        <DataTable :value="pedido.productos">
          <Column field="id" header="ID"></Column>
          <Column field="nombre" header="NOMBRE"></Column>
          <Column field="precio" header="PRECIO"></Column>
          <Column field="pivot.cantidad" header="C"></Column>
          <Column headerStyle="min-width:3rem;" header="SUB TOTAL">
          <template #body="slotProps">
              {{ parseFloat(slotProps.data.pivot.cantidad * slotProps.data.precio).toFixed(2) }}
          </template>
        </Column>
        </DataTable>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import pedidoService from "../../../services/pedido.service";
  import { jsPDF } from "jspdf";
  import autoTable from 'jspdf-autotable'
  
  const pedidos = ref([]);
  const visibleProductos = ref(false);
  const pedido = ref([]);
  
  onMounted(() => {
    listarPedidos();
  });
  
  const listarPedidos = async () => {
    const { data } = await pedidoService.listar();
    pedidos.value = data.data;
  };
  
  const verProductos = (datos) => {
    visibleProductos.value = true;
    pedido.value = datos;
  };
  
  const generarPDF = (pedido) => {
    console.log(JSON.stringify(pedido))
  
    const doc = new jsPDF();
  
  // Definir la posición inicial
  var posX = 15;
  var posY = 20;
  
  // Agregar la información del pedido
  doc.setFontSize(12);
  doc.text("ID del Pedido: " + pedido.id, posX, posY);
  doc.text("Fecha: " + pedido.fecha, posX + 85, posY);
  posY += 10;
  doc.text("Observaciones: " + pedido.observacion, posX, posY);
  posY += 20;
  
  // Agregar la información del cliente
  doc.setFontSize(12);
  doc.text("Cliente:", posX, posY);
  doc.setFontSize(10);
  doc.text("Nombre: " + pedido.cliente.nombre_completo, posX, posY + 7);
  doc.text("CI/NIT: " + pedido.cliente.ci_nit, posX, posY + 14);
  doc.text("Teléfono: " + (pedido.cliente.telefono || "N/A"), posX, posY + 21);
  
  // Agregar la tabla de productos
  var columns = [
    { header: "ID", dataKey: "id" },
    { header: "Producto", dataKey: "nombre" },
    { header: "Cantidad", dataKey: "cantidad" },
    { header: "Precio Unitario", dataKey: "precio" },
    { header: "Total", dataKey: "total" }
  ];
  var rows = [];
  
  var totalAmount = 0;
  
  for (var i = 0; i < pedido.productos.length; i++) {
    var producto = pedido.productos[i];
    var total = parseFloat(producto.precio) * producto.pivot.cantidad;
    totalAmount += total;
  
    rows.push({
      id: producto.id,
      nombre: producto.nombre,
      cantidad: producto.pivot.cantidad,
      precio: "$" + producto.precio,
      total: "$" + total.toFixed(2)
    });
  }
  
  var tablePosY = posY + 40;
  
  doc.autoTable(columns, rows, {
    startY: tablePosY,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: { top: 5, right: 2, bottom: 5, left: 2 }
    },
    columnStyles: {
      id: { columnWidth: 10 },
      nombre: { columnWidth: 60 },
      cantidad: { columnWidth: 20 },
      precio: { columnWidth: 30 },
      total: { columnWidth: 30 }
    }
  });
  
  // Agregar el total en el lado derecho
  var totalPosX = 150;
  var totalPosY = tablePosY + doc.autoTable.previous.finalY + 10;
  
  doc.setFontSize(12);
  // doc.setFontStyle("bold");
  doc.text("Total: $" + totalAmount.toFixed(2), totalPosX, totalPosY);
  
  
    doc.save(`${pedido.fecha}-${pedido.id}.pdf`);
  
  };
  </script>