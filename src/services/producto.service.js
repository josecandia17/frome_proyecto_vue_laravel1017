import { http } from "./Http"

export default {
    listar(page=1, limit=10, q=""){
        return http().get(`/producto?page=${page}&limit=${limit}&q=${q}`);
    },
    guardar(datos){
        return http().post("/producto", datos);
    },
    mostrar(id){
        return http().get("/producto/"+id);
    },
    modificar(datos, id){
        return http().put("/producto/"+id, datos);
    },
    eliminar(id){
        return http().delete("/producto/"+id);
    },
    actualizarImagen(id, datos) {
        return http().post(`/producto/${id}/actualizar-imagen`, datos)
    }
}