
// // con gulp se pueden automatizar tareas(funciones); las tareas se llaman llamar con "npx gulp <nombreTarea>"
// function tarea(done){
//   console.log(" mi primer tarea");

//   done();//en este caso el callback "done" me indica que la funión ya se ejecutó
// };

// exports.tarea = tarea;//así se llama a la función dado que gulp funciona con Node.js


// compilar sass con gulp

const {src, dest, watch, parallel} = require("gulp");

//CSS

const sass = require("gulp-sass")(require('sass')); //así se importan sass y gulp
const plumber = require('gulp-plumber')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps')

//Imágenes
const cache = require ('gulp-cache');
const imagemin = require ('gulp-imagemin');
const webp =  require ('gulp-webp');
const avif = require ('gulp-avif');

//Javascript

const tercer = require('gulp-terser-js')

function css(done){ 
  // Identificación con src; compilar con pipe(sass()) y almacenar con pipe(dest('build/css'))
  // El asterisco ayuda a acceder a todo lo que esté adentro, en este caso que tenga la extensión sass
  src('src/scss/**/*.scss') //1. identificar el archivo de sass (src) 
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass())// 2. compilarlo (ejecutar las funciones de sass)
  .pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('build/css'));// 3. almacenarla en el disco duro (dest)
  done()//callback que avisa el final de la función
}
function imagenes(done){
  const opciones = {
    optimizationLevel: 3
  }
  src('src/img/**/*.{png, jpg}')
  .pipe(cache(imagemin(opciones)))
  .pipe(dest('build/immg'))

  done();
}

function versionWebp(done){

  const opciones = {
    quality = 50
  };

  src('src/img/**/*.{png, jpg}')
  .pipe(webp(opciones))
  .pipe(dest('build/img'))
  done();
}

function versionAvif(done){

  const opciones = {
    quality = 50
  };

  src('src/img/**/*.{png, jpg}')
  .pipe(avif(opciones))
  .pipe(dest('build/img'))
  done();
}
//JavaScript

function javascript(done){
  src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write())
  .pipe(dest('build/js'))
  done();
}

//la siguiente función me entrgará la función watch de app.scss

function dev(done){
  watch('src/scss/**/*.scss', css)
  watch('src/scss/**/*.js', javascript)

  done()
}

// npm run <nombre archivo>(si está incluído en el package.json) o npx gulp <nombreArchivo> para correr en terminal
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (imagenes, versionWebp, versionAvif, javascript, dev);