import { http } from "./Http"

export default {
    listar(page=1, limit=10, q=""){
        return http().get(`/cliente?page=${page}&limit=${limit}&q=${q}`);
    },
    guardar(datos){
        return http().post("/cliente", datos);
    },
    mostrar(id){
        return http().get("/cliente/"+id);
    },
    modificar(datos, id){
        return http().put("/cliente/"+id, datos);
    },
    eliminar(id){
        return http().delete("/cliente/"+id);
    },
    buscar(q=""){
        return http().get(`/cliente?q=${q}`);
    },
}