class MediaPlayer {  //No fue necesario convertirla a class porque ya era class
  public media: HTMLMediaElement;  //audio y media heredan de HTMLMediaElement
  private plugins : Array<any>;
  public container: HTMLElement;

  constructor(config) {
    this.media = config.elemento; //leamos el elemento que representa el Media ( audio, video, etc)
    this.plugins = config.plugins || []; //configuracion inicial de los plugins, iniciar con un arreglo vacio

   //inicializar el player, para poder inicializar el nuevo contenedor de forma dinamica
   //es IMPORTANTE: que vaya antes del initPlugins
   this.initPlayer();  //leccion 40, no importa si va antes o despues de initPlugins()
 
    this.initPlugins(); //inicializacion de plugins, renombramos y la ponemos como privada
  }

  private initPlayer() { //contenedor de forma dinamica, que quede dentro del video
    this.container = document.createElement('div');  //nuevo contenedor
    //tomar el nuevo contenedor como pariente de Media, es decir, ponerlo al lado de media
    this.media.parentNode.insertBefore(this.container, this.media);  //el contenedor va a ir antes de media
    //ahora el contenedor pasa a ser el papa de media, es decir, media dentro de contenedor
    this.container.appendChild(this.media);

    //para poder poner los Ads, en la parte de abajo, se requiere que el container tenga posicion relativa
    this.container.style.position = 'relative';
  }

  private initPlugins() { //renombramos y la ponemos como privada
    /* this.plugins.forEach(plugin => {
      plugin.run(this);  //this, en este caso, se refiere a la instacia (plugin) de MediaPlayer
    }); */
    //Leccion 17, setter y getters, se modifica
    //que pasa si no quiero que tengan acceso a toda la info del plugin, solo quiero exponer ciertos metodos?

  /* 
    cuand hicimos este MediaPlayer decidimos pasarle este player:
    pero para este cambio a typescript, ya vamos a usar this
    con typescript, las variables privadas dejan de ser un problema, cuando las marcamos como privadas, typescript nos va 
    marcar error si tratamos de usarlas:
    const player = {
      play: () => this.play(),
      pause: () => this.pause(),
      media: this.media,
      //IMPORTANTE: los setter y getter NO son funciones, por lo tanto no se llaman como si fueran funciones, se asignan como si fueran variables.
      get mutedOk() {
        return this.media.muted; //hay un problema no hay ningun media en this, hay que agregarlo
      },
      set mutedOk(value) {
        this.media.muted = value;
      },
      //geter y setter para pausar
      get pausedOk() {
        return this.media.paused; //hay un problema no hay ningun media en this, hay que agregarlo
      },
      set pausedOk(value) {
        this.media.paused = value;
      },
    };
 */

    this.plugins.forEach(plugin => {
      //se sustituye por this para el ejemplo de typescript : plugin.run(player); //this, en este caso, se refiere a la instacia (plugin) de MediaPlayer
      plugin.run(this);
    });

  }
  //cuando se trabaja con clases, se tiene que añadir los metodos de la clase al prototype.
  //pasar un metodo de congifuracion para que leamos el elemento que representa el Media ( audio, video, etc)
  play() {
    this.media.play(); //con esto puede iniciar cualquier tipo de elemento que contenga el metodo play: audio, video, por ejemplo
  }
  pause() {
    this.media.pause(); //con esto puede iniciar cualquier tipo de elemento que contenga el metodo play: audio, video, por ejemplo
  }
  togglePlay() {
    if (this.media.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
  mute() {
    this.media.muted = true; //en silencio
  }
  unMute() {
    this.media.muted = false; //ya no esta en silencio
  }
  toggleMute() {
    this.media.muted = !this.media.muted;
  }
};
  
  
export default MediaPlayer;