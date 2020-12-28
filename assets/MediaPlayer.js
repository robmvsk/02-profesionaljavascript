function MediaPlayer(config) {  //objeto de configuracion
    this.media = config.elemento;  //leamos el elemento que representa el Media ( audio, video, etc)
    this.plugins = config.plugins || [];  //configuracion inicial de los plugins, iniciar con un arreglo vacio

    this._initPlugins();  //inicializacion de plugins
  };
  
  MediaPlayer.prototype._initPlugins = function() {  
    /* this.plugins.forEach(plugin => {
      plugin.run(this);  //this, en este caso, se refiere a la instacia (plugin) de MediaPlayer
    }); */

    //Leccion 17, setter y getters, se modifica
    //que pasa si no quiero que tengan acceso a toda la info del plugin, solo quiero exponer ciertos metodos?
    const player = {
      play: () => this.play(),
      pause: () => this.pause(),  //hasta aqui no tenemos acceso a mute y unmuted, como resolverlo? cn un setter y getter
      media: this.media,
      //IMPORTANTE: los setter y getter NO son funciones, por lo tanto no se llaman como si fueran funciones, se asignan como si fueran variables.
      get mutedOk() {  //se crea un getter llamado muted, que es una nueva propiedad virtual, que no existe en realidad
        return this.media.muted;  //hay un problema no hay ningun media en this, hay que agregarlo
      },
      set mutedOk(value) {  //se crea una segunda propiedad virtual, en este caso un setter
        this.media.muted = value;
      },
      //geter y setter para pausar
      get pausedOk() {  //se crea un getter llamado muted, que es una nueva propiedad virtual, que no existe en realidad
        return this.media.paused;  //hay un problema no hay ningun media en this, hay que agregarlo
      },
      set pausedOk(value) {  //se crea una segunda propiedad virtual, en este caso un setter
        this.media.paused = value;
      },
    };

    this.plugins.forEach(plugin => {
      plugin.run(player);  //this, en este caso, se refiere a la instacia (plugin) de MediaPlayer
    });

  };
  
  //cuando se trabaja con clases, se tiene que añadir los metodos de la clase al prototype.
  //pasar un metodo de congifuracion para que leamos el elemento que representa el Media ( audio, video, etc)
  MediaPlayer.prototype.play = function() {  
    this.media.play();  //con esto puede iniciar cualquier tipo de elemento que contenga el metodo play: audio, video, por ejemplo
  };
  MediaPlayer.prototype.pause = function() {  
    this.media.pause();  //con esto puede iniciar cualquier tipo de elemento que contenga el metodo play: audio, video, por ejemplo
  };
  
  MediaPlayer.prototype.togglePlay = function() {
    if(this.media.paused) {
      this.play();
    } else {
      this.pause();
    }
  };

  MediaPlayer.prototype.mute = function() {  
    this.media.muted = true;  //en silencio
  };
  MediaPlayer.prototype.unMute = function() {  
    this.media.muted = false;  //ya no esta en silencio
  };

  MediaPlayer.prototype.toggleMute = function() {
    this.media.muted = !this.media.muted;
  };

  export default MediaPlayer;