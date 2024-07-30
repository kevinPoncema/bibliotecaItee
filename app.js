const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const app = express();
const port = 3000;
bookModel =require("./models/bookModel")
const categoriaModel = require("./models/categoriaModel")
//modelo libro hace referencia a los libros fisicos mientras que book model a los pdf 
const LibroaModel = require("./models/libroModel");
// Configuración de EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configura el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
    // Obtener la categoría desde el formulario
  destination: (req, file, cb) => {
    const categoriaArray = JSON.parse(req.body.categoria);
    const uploadPath = path.join(__dirname, 'books', categoriaArray[0]);

    // Crear la carpeta si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const nombrePdf = req.body.nombrePdf; // Obtener el nombre del PDF desde el formulario
    cb(null, `${nombrePdf}.pdf`);
  }
});

const upload = multer({ storage });
//configura las sesiones 
app.use(session({
    secret: 'mi_secreto_super_secreto', // Una cadena secreta para firmar la cookie de sesión
    resave: false,                      // No volver a guardar la sesión si no ha habido cambios
    saveUninitialized: true,            // Guardar una sesión nueva sin inicializar
    cookie: { secure: false }           // Para entornos de desarrollo, puede ser false
  }));

//pantalla incial 
app.get("/",async(req,res)=>{
    let modelo = new bookModel()
    let model2 = new categoriaModel()
    //obtiene las categorias
    let cate =await model2.getCat()
    let data =await modelo.getBook()
    const rango = req.session.usuarioRango;
    //console.log(data.rows)
    console.log(cate.rows);
    res.render("index",{books:data.rows,rango:rango,cat:cate.rows})
})

//filtro para los pdfs 
app.post("/filtrarPdfs",async (req,res)=>{
  //instancia los modelos
    let modelo = new bookModel()
    let model2 = new categoriaModel()
    const rango = req.session.usuarioRango;
    //obtiene datos del formulario
    let name = req.body.nombre || "";
    let cateParam = req.body.id_categoria
    //obtiene las categorias 
    let cate =await model2.getCat()
    //si no se envio una categoria especifica
    if (cateParam == -1) {
      //fitra solo por el nombre  y devuelve la vista
      let data = await modelo.filterPdf(name);
      return res.render("index",{books:data.rows,rango:rango,cat:cate.rows})
    }
    //si si se envio una categoria especifica
    let data = await modelo.filterPdfNameCategory(name,cateParam)
    console.log(data.rows,name,cateParam)
    return res.render("index",{books:data.rows,rango:rango,cat:cate.rows})
});

//control de usarios
//ruta para obtener el formulario de loging
app.get("/login",(req,res)=>{res.render("login",{colorP:"success-message",message:"" })})

//importa el modelo del usario
userModel = require("./models/userModel")
app.post('/logIn', async (req, res) => {
    const usuario = req.body.username;
    const passWord = req.body.password;
  
    try {
      // Instancia el modelo
      let modelo = new userModel();
      // Verifica si el usuario existe
      const data = await modelo.userExist([usuario, passWord]);
      if (data.rows.length > 0) {
        // Crea una sesión
        req.session.usuarioName = data.rows[0].nombre_usuario;
        req.session.usuarioRango = data.rows[0].rango;
        // Renderiza el panel administrativo
        return res.redirect("/") 
      } else {
        // Usuario y/o contraseña incorrectos
        res.render('login', {
          colorP: 'error-message',
          message: 'Usuario y/o contraseña incorrectos'
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.render('login', {
        colorP: 'error-message',
        message: error
      });
    }
  });
  

  // middleware para validar la sesion y si el usuario es admin
function verificarSesionAdmin(req, res, next) {
    // Verifica si el usuario está en la sesión
    console.log(req.session.usuarioName,req.session.usuarioRango)
    if (!req.session.usuarioName || !req.session.usuarioRango) {
      return res.status(401).redirect('/login'); // Redirige al usuario a la página de login si no está autenticado
    }
    // Verifica si el rango del usuario es mayor que 0
    if ( req.session.usuarioRango <1) {
      return res.status(403).send('Acceso denegado'); // Acceso denegado si el rango es 0 o menor
    }
    // Continúa con la siguiente función de middleware o ruta si las verificaciones son exitosas
    next();
  }

// Ruta principal para el formulario de carga
app.get('/uploadBook',verificarSesionAdmin, async(req, res) => {
    const modelo = new categoriaModel();
    data = await modelo.getCat();
    res.render('uploadBook',{cat:data.rows});
  });

// Ruta para procesar la carga de archivos
app.post('/upload', upload.single('pdfFile'),async (req, res) => {
    let modelo = new bookModel();
    let nombre = req.body.nombrePdf;
    const categoriaArray = JSON.parse(req.body.categoria);
    let filePath = `book/${nombre}/${categoriaArray[0]}`; // Ruta de archivo con interpolación de cadenas
    await modelo.createBook([nombre,categoriaArray[1],filePath]);

  res.redirect("/")
});



//ruta para obtener un libro 
app.get('/book/:nombrePdf/:categoria?', (req, res) => {
    const { nombrePdf, categoria = 'general' } = req.params; // Parámetros en la URL, categoría predeterminada es 'general'
    
    const filePath = path.join(__dirname, 'books', categoria, `${nombrePdf}.pdf`);
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send('Archivo no encontrado');
      }
  
      res.sendFile(filePath);
    });
  });

  //curd de categorias
app.get("/categoria",verificarSesionAdmin,async(req,res)=>{
    const modelo = new categoriaModel();
    data = await modelo.getCat();
    res.render("crudCategoria",{cat:data.rows})
    
})

app.post("/categoria", verificarSesionAdmin, async (req, res) => {
    try {
        // Asegúrate de que req.body.name esté definido
        if (!req.body.name) {
            return res.status(400).send("El nombre de la categoría es requerido");
        }
        let modelo = new categoriaModel();
        let categoriaName = req.body.name;
        console.log(categoriaName)
        // Asegúrate de que el método createCat esté implementado y funcione
        await modelo.createCat([categoriaName]);
        res.redirect("/categoria")
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).send("Error al crear la categoría");
    }
});

app.get("/deleteCat/:catId", verificarSesionAdmin, async (req, res) => {
    try {
        const catId = req.params.catId;
        const modelo = new categoriaModel();
        await modelo.deleteCat([catId]);
        res.redirect("/categoria"); // Redirige a la lista de categorías después de eliminar
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).send("Error al eliminar categoría");
    }
});
//borrar el libro
app.get("/deleteBook/:bookId", verificarSesionAdmin,async (req, res) => {
    let responseSent = false; // Bandera para verificar si ya se envió una respuesta
    try {
        const bookId = req.params.bookId;
        const modelo = new bookModel();
        // Obtiene la URL del libro
        let data = await modelo.selectBook([bookId]);
        if (data.rows.length === 0) {
            return res.status(404).send("Libro no encontrado");
        }
        let mypath = "books/"+data.rows[0].categoria_book+"/"+data.rows[0].nombre_book+".pdf";
        // Borra el libro de la base de datos
        await modelo.deleteBook([bookId]);
        // Borra el archivo físico
        fs.unlink(path.join(__dirname,mypath), (err) => {
            if (err) {
                console.error('Error al borrar el archivo:', err);
                if (!responseSent) {
                    res.status(500).send("Error al borrar el archivo");
                    responseSent = true;
                }
                return;
            }
            console.log('Archivo borrado con éxito');
        })
        return res.redirect("/");
        
    } catch (error) {
        console.error('Error al eliminar libro:', error);
        if (!responseSent) {
            res.status(500).send("Error al eliminar libro");
            responseSent = true;
        }
    }
});

//entpoint para obtener el formulario de crear libros (libros fisicos) 
app.get("/createLibro",async(req,res)=>{
  const modelo = new categoriaModel();
  data = await modelo.getCat();
  res.render('libroForm',{cat:data.rows});
});

app.post('/createLibro', async (req, res) => {
  const { categoria, author, titulo, edicion, editorial } = req.body;
    let model = new LibroaModel(); 
    await model.createLibro( [categoria, author, titulo, edicion, editorial ]);
  // Respuesta de éxito al cliente
  res.send('Formulario recibido correctamente');
});

//obtiene la lista de libros fisicos 
app.get("/libros",async(req,res)=>{
  let modelo = new LibroaModel()
  let model2 = new categoriaModel()
  let cate =await model2.getCat()
  let data =await modelo.selectLibro()
  return res.render("libros",{libros:data.rows,cat:cate.rows})
})

//entpoint para borar el libro 
app.get("/deleteLibro/:idLibro", verificarSesionAdmin, async (req, res) => {
  try {
      const idLibro = req.params.idLibro;
      const modelo = new LibroaModel();
      await modelo.deleteLibro([idLibro]);
      res.redirect("/libros"); // Redirige a la lista de libros después de eliminar
  } catch (error) {
      console.error('Error al eliminar libros:', error);
      res.status(500).send("Error al eliminar categoría");
  }
});


//entpoint para editar el libro
app.get("/updateLibro/:idLibro",async(req,res)=>{
  const idLibro = req.params.idLibro;
  const modelo = new LibroaModel();
  const modelCategorias = new categoriaModel()
  let categorias = await modelCategorias.getCat();
  let data = await modelo.getLibro(idLibro);
  res.render("editarLibro",{data:data.rows[0],cat:categorias.rows})
});


// Ruta para manejar la solicitud POST para actualizar el libro
app.post('/updateLibro/:idLibro', async (req, res) => {
    const idLibro = req.params.idLibro;
    const { titulo, edicion, author, editorial,categoria } = req.body;
    try {
        const modelo = new LibroaModel();
        await modelo.updateLibro([titulo,edicion,author,editorial,categoria,idLibro]);
        res.redirect('/libros');
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).send('Error al actualizar el libro');
    }
});

//filtra los libros ^_^
app.post("/filtrarLibro",async (req,res)=>{
  //instancia los modelos
    let modelo = new LibroaModel()
    let model2 = new categoriaModel()
    //obtiene datos del formulario
    let name = req.body.nombre || "";
    let cateParam = req.body.id_categoria
    //obtiene las categorias 
    let cate =await model2.getCat()
    //si no se envio una categoria especifica
    if (cateParam == -1) {
      //fitra solo por el nombre  y devuelve la vista
      let data = await modelo.filterLibro(name);
      return res.render("libros",{libros:data.rows,cat:cate.rows})
    }
    //si si se envio una categoria especifica
    let data = await modelo.filterLibroNameCategory(name,cateParam)
    return res.render("libros",{libros:data.rows,cat:cate.rows})
});

//formulario para gestionar los usarios
app.get("/gestionarUser",verificarSesionAdmin,async (req,res)=>{
  let modelo = new userModel();
  let data =  await modelo.getUsers();
  res.render("users",{users:data.rows})
})

app.post("/createUser",verificarSesionAdmin,async(req,res)=>{
  let modelo = new userModel();
  const name = req.body.nombreUsuario
  const passWord = req.body.passwordUsuario;
  const rango = req.body.rango;
  await  modelo.createUser([name,passWord,rango]);
  res.redirect("/gestionarUser")
});

// Ruta para eliminar un usuario
app.post("/deleteUser",verificarSesionAdmin, async (req, res) => {
  const { id_usuario } = req.body;
  let modelo = new userModel();
  await modelo.deleteUser(id_usuario);
  res.redirect("/gestionarUser");
});

//logica del prestamo de libro
// Endpoint para mostrar el formulario de préstamo de libros
app.get("/prestamo", async (req, res) => {
  try {
      const libroModel = new LibroaModel();;
      const libros = await libroModel.selectLibro(); // Obtener todos los libros para inicializar la tabla
      let cateModel = new categoriaModel();
      let cate =await cateModel.getCat()
      res.render("prestamo", { libros: libros.rows,cat:cate.rows});
  } catch (error) {
      console.error('Error al obtener datos para el préstamo de libros:', error);
      res.status(500).send('Error al obtener datos para el préstamo de libros');
  }
});
//logica para buscar libros desde la pantalla del prestamo 
// Endpoint para buscar libros
app.get('/prestar', async (req, res) => {
  try {
      const nombre = req.query.nombre || '';
      const id_categoria = req.query.id_categoria || -1;
      const libroModel = new LibroaModel();
      let libros;

      if (id_categoria == -1) {
          libros = await libroModel.filterLibro(nombre);
      } else {
          libros = await libroModel.filterLibroNameCategory(nombre, id_categoria);
      }

      res.json({ libros: libros.rows });
  } catch (error) {
      console.error('Error al buscar libros:', error);
      res.status(500).send('Error al buscar libros');
  }
});

// Endpoint para recibir los datos y mostrar la página de impresión
// Endpoint para recibir los datos y mostrar la página de impresión
app.post('/imprimir', (req, res) => {
  const { alumno, libros } = req.body;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const date = currentDate.toLocaleDateString();
  console.log(req.body)
  res.render('imprimir', {
      alumno,
      libros,
      year,
      date
  });
});
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
