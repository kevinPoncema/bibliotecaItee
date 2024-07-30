//este modelo hace referencia al libro fisico no confundir con el bookModel Que hace referencia al libro en pdf 
const ConexionClass = require("./conexion");
class libro {
async createLibro(params){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const sql = `INSERT INTO tbl_libro (id_categoria, tituloe_libro, edicion_libro, author, Editorial) 
                   VALUES (?, ?, ?, ?, ?)`;
      const data = await conexion.queryModifay(sql,params);
    }catch (error){
      throw error
    }
  }

  async getLibro(idLibro){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const query = `
           SELECT l.id_libro, l.tituloe_libro, l.edicion_libro, l.author, l.Editorial, c.id_categoria, c.nombre_categoria
            FROM tbl_libro l
            INNER JOIN tbl_categoria c ON l.id_categoria = c.id_categoria
            WHERE l.id_libro = ?;
           `;
      const data = await conexion.queryParams(query,[idLibro]);
      return data;
    }catch (error){
      throw error
    }
  }

  async deleteLibro(params) {
    try {
        const conexion = new ConexionClass();
        await conexion.conectar();
        // Asegúrate de que la consulta tenga el nombre de la tabla y los valores correctos
        const query = "DELETE FROM tbl_libro WHERE id_libro = ?";
        // Ejecuta la consulta
        const data = await conexion.queryModifay(query, params);
        return data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;  // Propaga el error hacia el controlador
    }

    
    
}

async selectLibro(params){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const query = `
      SELECT l.id_libro, l.tituloe_libro, l.edicion_libro, l.author, l.Editorial, c.id_categoria, c.nombre_categoria
      FROM tbl_libro l
      INNER JOIN tbl_categoria c ON l.id_categoria = c.id_categoria;
    `;
      const data = await conexion.queryParams(query,params);
      return data;
    }catch (error){
      throw error
    }
  }

async updateLibro(params){
  try {
    const conexion = new ConexionClass();
    await conexion.conectar();
    const query = `UPDATE tbl_libro
          SET tituloe_libro = ?,
          edicion_libro = ?,
          author = ?,
          Editorial = ?,
          id_categoria = ?
          WHERE id_libro = ?;`
          await conexion.queryModifay(query,params);
          return true;

  } catch (error) {
    throw error;
  }
}

async filterLibro(name) {
  try {
    // Establece la conexión a la base de datos
    const conexion = new ConexionClass();
    await conexion.conectar();
    
    // Prepara la consulta SQL
    const query = `
  SELECT l.id_libro, l.tituloe_libro, l.edicion_libro, l.author, l.Editorial, c.id_categoria, c.nombre_categoria
      FROM tbl_libro l
      INNER JOIN tbl_categoria c ON l.id_categoria = c.id_categoria 
		WHERE l.tituloe_libro LIKE ?;
    `;
    // Prepara el parámetro de búsqueda
    const nameParam = `%${name}%`;
    const data = await conexion.queryParams(query, [nameParam]);
    return data;
  } catch (error) {
    // Maneja el error y lo lanza nuevamente
    console.error('Error en filterPdf:', error);
    throw error;
  } 
}

async filterLibroNameCategory(name,categoria){
  try{
    const conexion = new ConexionClass();
    await conexion.conectar();
    const query = `
      SELECT l.id_libro, l.tituloe_libro, l.edicion_libro, l.author, l.Editorial, c.id_categoria, c.nombre_categoria
      FROM tbl_libro l
      INNER JOIN tbl_categoria c ON l.id_categoria = c.id_categoria 
		WHERE l.tituloe_libro LIKE ? AND  l.id_categoria = ?;
        `;
        let nameParam = "%"+name+"%"
    const data = await conexion.queryParams(query,[nameParam,categoria]);
    return data;
  }catch (error){
    throw error
  }
}

}



module.exports = libro;