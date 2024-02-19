import { http } from "./Http"

export default {
    listar(){
        return http().get("/categoria");
    },
    guardar(datos){
        return http().post("/categoria", datos);
    },
    mostrar(id){
        return http().get("/categoria/"+id);
    },
    modificar(datos, id){
        return http().put("/categoria/"+id, datos);
    },
    eliminar(id){
        return http().delete("/categoria/"+id);
    }
}