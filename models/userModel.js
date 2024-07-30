const ConexionClass = require("./conexion");
class UserModel {
  async userExist(params) {
    try {
      const conexion = new ConexionClass();
      await conexion.conectar();
      const data = await conexion.queryParams("SELECT * FROM tbl_usuario WHERE nombre_usuario = ? AND contraseña_usuario = ?",params);
      await conexion.desconectar(); // Cerrar la conexión después de usarla
      return  data;
    } catch (error) {
      console.error('Error al verificar si el usuario existe:', error);
      throw error;
    }
  }

  async createUser(params){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
    //  console.log(params)
      const data = await conexion.queryModifay("INSERT INTO tbl_usuario(nombre_usuario,`contraseña_usuario`,rango) VALUES(?,?,?);",params);
    }catch (error){
      throw error
    }
  }
 async getUsers(){
    try {
      const conexion = new ConexionClass();
      await conexion.conectar();
      const data = await conexion.queryParams("SELECT * FROM `tbl_usuario`",[]);
      await conexion.desconectar(); // Cerrar la conexión después de usarla
      return  data;
    } catch (error) {
      console.error('Error al verificar si el usuario existe:', error);
      throw error;
    }

  }

  async deleteUser(id_usuario){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
    //  console.log(params)
      const data = await conexion.queryModifay("DELETE FROM tbl_usuario WHERE id_usuario = ?;",[id_usuario]);
    }catch (error){
      throw error
    }
  }
}

module.exports = UserModel;

