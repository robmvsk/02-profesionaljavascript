

 //cuando el que se importa el el export default, NO necesita {}, solo hay un default, el resto de los export del mismo archivo, deben ir entre  { }
 import MediaPlayer  from "./MediaPlayer.js";   //OJO, es super importante que cuando se llame como type="module", lleve siempre la extension, SINO fallara.
//el primer plugin, nos va a resolver el problema del autoplay que tira un error
import AutoPlay from './plugins/AutoPlay.js';
//nuevo plugin para hacer el autoPause, cuando el elemento se vea menos del 25% en pantalla
import AutoPause from './plugins/AutoPause.js';


const video = document.querySelector('video');
const player = new MediaPlayer( { 
        elemento : video, 
        plugins : [new AutoPlay(), new AutoPause()], 
    } );  //se obliga a pasar un objeto de configuracion, es decir pasar el elemento de video, que podria ser el elemento de audio

//cuando hay mas elementos del mismo tipo (en este caso button), se usa el id para nombrarlos, y en querySelector se agrega el #Id, y con eso.
const buttonPlay = document.querySelector('#buttonPlay');
buttonPlay.onclick = () => player.togglePlay();  // se sustituye la llamada directa por una clase que puede hacer mas cosas, inicialmente hace lo mismo que llamarlo de forma directa.

const buttonMute = document.querySelector('#buttonMute');
buttonMute.onclick = () => player.toggleMute();  // Mute/unMute


//LECCION 23. Service Workers, Va a poder funcionar estando OFFLINE
if ('serviceWorker' in navigator) {  //No todos los navegadores soportan services worker
    navigator.serviceWorker.register('/sw.js').catch(error => { //es posible que durante el registro del archivo ocurra un error, por lo tanto es importante cacharlo y visualizar que error es
      console.log(error.message);
    });
    //antes de escribir el archivo sw.js, marcara este error:
    //A bad HTTP response code (404) was received when fetching the script.
  };
