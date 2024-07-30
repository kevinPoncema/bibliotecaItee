const ConexionClass = require("./conexion");
class book {
async createBook(params){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const data = await conexion.queryModifay("INSERT INTO tbl_books(nombre_book,id_categoria,url) VALUES(?,?,?);",params);
    }catch (error){
      throw error
    }
  }

  async getBook(){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const query = `
      SELECT
        b.id_book,
        b.nombre_book,
        b.url,
        c.nombre_categoria AS categoria_book
      FROM
        tbl_books b
      JOIN
        tbl_categoria c ON b.id_categoria = c.id_categoria;
    `;
      const data = await conexion.queryParams(query,[]);
      return data;
    }catch (error){
      throw error
    }
  }

  async deleteBook(params) {
    try {
        const conexion = new ConexionClass();
        await conexion.conectar();
        // Asegúrate de que la consulta tenga el nombre de la tabla y los valores correctos
        const query = "DELETE FROM tbl_books WHERE id_book = ?";
        // Ejecuta la consulta
        const data = await conexion.queryModifay(query, params);
        return data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;  // Propaga el error hacia el controlador
    }

    
    
}

async selectBook(params){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const query = `
      SELECT
        b.id_book,
        b.nombre_book,
        b.url,
        c.nombre_categoria AS categoria_book
      FROM
        tbl_books b
      JOIN
        tbl_categoria c ON b.id_categoria = c.id_categoria WHERE id_book = ?;
    `;
      const data = await conexion.queryParams(query,params);
      return data;
    }catch (error){
      throw error
    }
  }
  async filterPdf(name) {
    try {
      // Establece la conexión a la base de datos
      const conexion = new ConexionClass();
      await conexion.conectar();
      
      // Prepara la consulta SQL
      const query = `
        SELECT
          b.id_book,
          b.nombre_book,
          b.url,
          c.nombre_categoria AS categoria_book
        FROM
          tbl_books b
        JOIN
          tbl_categoria c ON b.id_categoria = c.id_categoria
        WHERE
          b.nombre_book LIKE ?;
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
  

  //filtra los pdfs solo por categoria y por nombre 
  async filterPdfNameCategory(name,categoria){
    try{
      const conexion = new ConexionClass();
      await conexion.conectar();
      const query = `
        SELECT
              b.id_book,
              b.nombre_book,
              b.url,
              c.nombre_categoria AS categoria_book
            FROM
              tbl_books b
            JOIN
              tbl_categoria c ON b.id_categoria = c.id_categoria
              WHERE b.nombre_book LIKE ? AND b.id_categoria =?;
          `;
          let nameParam = "%"+name+"%"
      const data = await conexion.queryParams(query,[nameParam,categoria]);
      return data;
    }catch (error){
      throw error
    }
  }

}



module.exports = book;