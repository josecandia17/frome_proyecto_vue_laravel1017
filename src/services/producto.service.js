import { http } from "./Http"

export default {
    listar(page=1, limit=10, q=""){
        return http().get(`/podructo?page=${page}&limit=${limit}&q=${q}`);
    },
    guardar(datos){
        return http().post("/podructo", datos);
    },
    mostrar(id){
        return http().get("/podructo/"+id);
    },
    modificar(datos, id){
        return http().put("/podructo/"+id, datos);
    },
    eliminar(id){
        return http().delete("/podructo/"+id);
    },
    actualizarImagen(id, datos) {
        return http().post(`/podructo/${id}/actualizar-imagen`, datos)
    }
}