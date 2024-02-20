import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useAuthStore = defineStore("auth", ()=> {
    const auth = ref(false)
    const usuario = ref(null)

    onMounted(()=>{
        if(!usuario.value){
            usuario.value = localStorage.getItem("auth")
        }
    })

    const setUsuario = (email) => {
        usuario.value = email;
    }

    return {
        auth,
        usuario,
        setUsuario
    }

})