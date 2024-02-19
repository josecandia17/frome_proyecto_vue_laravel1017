<template>
    <!--<div>
        {{ usuario }}
        <h1>Login</h1>
        <label for="e">Ingresar Correo</label>
        <input type="email" v-model="usuario.email">
         <span>{{ errors.email }}</span>
        <br>
        <label>Ingresar Contraseña</label>
        <input type="password" v-model="usuario.password">
        <span>{{ errors.password }}</span>
        <br>
        <input type="button" value="Ingresar" v-on:click="funIngresar()">

       
    </div>-->
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="https://logodownload.org/wp-content/uploads/2014/09/google-logo-1.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                        <span class="text-600 font-medium">Ingresar para continuar</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="usuario.email" />
                        <span>{{ errors.email }}</span>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                        <span>{{ errors.password }}</span>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <!--div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div-->
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Recuperar contraseñá</a>
                        </div>
                        <Button label="Ingresar" class="w-full p-3 text-xl" v-on:click="funIngresar()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import authService from "./../services/auth.service";

    // variables 
    //const correo= ref ("micorreo@gmail.com");

    //const clave=ref ("mipassword");

    const usuario = ref ({ email: "", password:""})
    const errors = ref({})

    const router = useRouter()

    //metodos
    async function funIngresar(){
        try{
            const { data }=await authService.loginConLaravel(usuario.value)
            console.log("CON INTERCEPTOR: ", data)
            errors.value={}

            localStorage.setItem("access_token", data.access_token);
            router.push("/about")

        }catch (error){
            console.log(error.response.data)
            errors.value = error.response.data.errors
            
        }

    

        /*axios.post("http://127.0.0.1:8000/api/v1/auth/login", usuario.value).then(
            (res) => {
                console.log("CON AXIOS: ", res.data)
            } 
        )*/
    }

</script>


