<html>
  <head>
    <title>PlatziMediaPlayer.js</title>
    <link
      rel="stylesheet"
      href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
    />
    <link rel="stylesheet" href="./assets/index.css" />
  </head>

  <body>
    <header>
      <h1>PlatziMediaPlayer.js</h1>
      <p>An extensible media player.</p>
    </header>

    <main class="container">
      <video class="movie">
        <source src="./assets/BigBuckBunny.mp4" />
      </video>

      <button>Play/Pause</button>
    </main>

    <!--script>
      function MediaPlayer(config) {
        this.media = config.el;
      }

      MediaPlayer.prototype.play = function() {
        this.media.play();
      };

      MediaPlayer.prototype.pause = function() {
        this.media.pause();
      };

      MediaPlayer.prototype.togglePlay = function() {
        if (this.media.paused) {
          this.play();
        } else {
          this.pause();
        }
      };

      const video = document.querySelector('video');
      const player = new MediaPlayer({ el: video });

      const button = document.querySelector('button');
      button.onclick = () => player.togglePlay();

    </script-->

    <script>
      const video = document.querySelector('video');
      const button = document.querySelector('button');

      function MediaPlayer(config) {  //objeto de configuracion
        this.media = config.elemento  //leamos el elemento que representa el Media ( audio, video, etc)
      }
      //cuando se trabaja con clases, se tiene que añadir los metodos de la clase al prototype.
      //pasar un metodo de congifuracion para que leamos el elemento que representa el Media ( audio, video, etc)
      MediaPlayer.prototype.play = function() {  
        this.media.play()  //con esto puede iniciar cualquier tipo de elemento que contenga el metodo play: audio, video, por ejemplo
      }
      MediaPlayer.prototype.pause = function() {  
        this.media.pause()  //con esto puede iniciar cualquier tipo de elemento que contenga el metodo play: audio, video, por ejemplo
      }
      MediaPlayer.prototype.togglePlay = function() {
        if(this.media.paused) {
          this.play()
        } else {
          this.pause()
        }
      }

      const player = new MediaPlayer({elemento : video});  //se obliga a pasar un objeto de configuracion, es decir pasar el elemento de video, que podria ser el elemento de audio
      button.onclick = () => player.togglePlay();  // se sustituye la llamada directa por una clase que puede hacer mas cosas, inicialmente hace lo mismo que llamarlo de forma directa.
      
    </script>
  </body>
</html>
