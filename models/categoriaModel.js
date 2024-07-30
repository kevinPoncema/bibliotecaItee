const ConexionClass = require("./conexion");
class categoria {
async getCat(){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const data = await conexion.queryParams("SELECT * FROM tbl_categoria",[]);
      return data;
    }catch (error){
      throw error
    }
  }

  async createCat(params) {
    try {
        const conexion = new ConexionClass();
        await conexion.conectar();
        // Asegúrate de que la consulta tenga el nombre de la tabla y los valores correctos
        const query = "INSERT INTO tbl_categoria (nombre_categoria) VALUES (?)";
        // Ejecuta la consulta
        const data = await conexion.queryModifay(query, params);
        return data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;  // Propaga el error hacia el controlador
    }
}

async deleteCat(params) {
    try {
        const conexion = new ConexionClass();
        await conexion.conectar();
        // Asegúrate de que la consulta tenga el nombre de la tabla y los valores correctos
        const query = "DELETE FROM tbl_categoria WHERE tbl_categoria.id_categoria = ?";
        // Ejecuta la consulta
        const data = await conexion.queryModifay(query, params);
        return data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;  // Propaga el error hacia el controlador
    }
}


}



module.exports = categoria;