
// // con gulp se pueden automatizar tareas(funciones); las tareas se llaman llamar con "npx gulp <nombreTarea>"
// function tarea(done){
//   console.log(" mi primer tarea");

//   done();//en este caso el callback "done" me indica que la funión ya se ejecutó
// };

// exports.tarea = tarea;//así se llama a la función dado que gulp funciona con Node.js


// compilar sass con gulp

const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require('sass')); //así se importan sass y gulp
const plumber = require('gulp-plumber')

function css(done){ 
  // Identificación con src; compilar con pipe(sass()) y almacenar con pipe(dest('build/css'))
  // El asterisco ayuda a acceder a todo lo que esté adentro, en este caso que tenga la extensión sass
  src('src/scss/**/*.scss') //1. identificar el archivo de sass (src) 
  .pipe(plumber());
  .pipe(sass());// 2. compilarlo (ejecutar las funciones de sass)
  .pipe(dest('build/css'));// 3. almacenarla en el disco duro (dest)

  done();//callback que avisa el final de la función
}
//la siguiente función me entrgará la función watch de app.scss
function dev(done){
  watch('src/scss/**/*..scss', css)

  done()
}
// npm run <nombre archivo>(si está incluído en el package.json) o npx gulp <nombreArchivo> para correr en terminal
exports.css = css;
exports.dev = dev;