import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useContadorStore = defineStore("contador", ()=> {
    const micontador = ref(5)
    const otrovalor = ref(0)

    const aumentar = () => {
        micontador.value++;
    }
    const reducir = () => {
        micontador.value--;
    }

    return {
        micontador,
        otrovalor,
        aumentar,
        reducir
    }

})
