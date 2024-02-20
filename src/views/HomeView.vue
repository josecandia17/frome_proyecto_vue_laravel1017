<script setup>
import TheWelcome from '../components/TheWelcome.vue'
// para pinia
    import { useContadorStore } from "@/stores/contador"
    const contador = useContadorStore()
</script>

<template>
  <main>
    <div class="card">
      <h1>{{ contador.micontador }}</h1>

      <Button @click="contador.aumentar">+</Button>
      <Button @click="contador.reducir">-</Button>

    </div>
  </main>
</template>
