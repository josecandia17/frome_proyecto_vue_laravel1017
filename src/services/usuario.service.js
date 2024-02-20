import { http } from "./Http"

export default {
    listar(){
        return http().get("/usuario");
    },
    guardar(datos){
        return http().post("/usuario", datos);
    },
    mostrar(id){
        return http().get("/usuario/"+id);
    },
    modificar(datos, id){
        return http().put("/usuario/"+id, datos);
    },
    eliminar(id){
        return http().delete("/usuario/"+id);
    }
}