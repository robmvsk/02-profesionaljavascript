class AutoPause {
    constructor() {
        this.pausedIntersectionOfMe = false;
        this.PuasedVisibleOfMe = false;
        
        console.log(`this.pausedIntersectionOfMe: ${this.pausedIntersectionOfMe}, this.PuasedVisibleOfMe: ${this.PuasedVisibleOfMe}`);
        this.threshold = 0.25;
        /* La exception generada es:
            Uncaught TypeError: Cannot read property 'pause' of undefined
            at IntersectionObserver.handleIntersection 
        */

        //se le va a establecer el this permanetemente
       this.handleIntersection = this.handleIntersection.bind(this); //el this va a ser la instancia del objeto, en este caso del plugin, es decir la instancia de MediaPlayer
       //porque a este nivel, tis es la instancia del objeto AutoPause (del plugin AutoPause)

       //se le va a establecer el this permanetemente
       this.handleVisibilityChange = this.handleVisibilityChange.bind(this); //el this va a ser la instancia del objeto, en este caso del plugin, es decir la instancia de MediaPlayer
       //porque a este nivel, tis es la instancia del objeto AutoPause (del plugin AutoPause)
    }
    run(player) {
        this.player = player;
        //el primer parametro es un handle, es una funcion y es quien recibe el anuncio, hey hubo una interseccion en el objeto que estas observando
        //el segundo es un objeto de configuaracion (hay que pasarle un umbral o threshold: y que define que % del elemento debe tener con el contenedor para avisarte)
        //const observer = new IntersectionObserver(handle, config);

        //aqui el this del handleIntersection es el IntersectionObserver (el this es del objeto que esta llamando la funcion, el objeto es IntersectionObserver y la funcion es handleIntersection ==> el this dentro de la funcion es el intersectorObserver)
        const observer = new IntersectionObserver( this.handleIntersection, { threshold: this.threshold } );  //causa un error ya que tis es el intersectionObserver y no el player, como necesitamos, entonces hacemos que el this sea permanete en el constructor (una forma de hacerlo, hay varias, por ejemplo con arrow fuctions)

        //el observer que se va a poner a observar? el player.media, 
        // y quien va a ser el contenedor? toda la pantalla, en este caso
        observer.observe(this.player.media);

        //leccion 22. implementando Visibility Change:

        //aqui el this del handleVisibilityChange es el document (el this es del objeto que esta llamando la funcion, el objeto es document y la funcion es handleVisibilityChange ==> el this dentro de la funcion es el document)
        document.addEventListener("visibilitychange", this.handleVisibilityChange);  //se implementa el metodo handleVisibilityChange
    }

    handleIntersection(entries) {  //entries: son la lista de elementos que se estan observando, en este caso solo sera uno.
        const entry = entries[0];
        console.log(entry);

        const isVisible = entry.intersectionRatio >= this.threshold;

        //recordando que el player, ya no trae todos los metodos expuestos, entre ellos el mute(), se usa ahora el getter
        console.log(`isVisible: ${isVisible}, this.player.pausedOk: ${this.player.pausedOk}, this.pausedIntersectionOfMe: ${this.pausedIntersectionOfMe}`);
        if (isVisible && (!this.player.pausedOk || this.pausedIntersectionOfMe)) {
            console.log("handleIntersection...entrando a playing...")
            this.player.play();
            this.pausedIntersectionOfMe = false;
        } else if (!isVisible && !this.player.pausedOk) {
            console.log("handleIntersection...entrando a pausar...")
            this.player.pause();
            this.pausedIntersectionOfMe = true;
        }
    }

    handleVisibilityChange() {
        const isVisible = document.visibilityState === "visible";  //puede ser tambien hidden 

        console.log(`isVisible: ${isVisible}, this.player.pausedOk: ${this.player.pausedOk}, this.PuasedVisibleOfMe: ${this.PuasedVisibleOfMe}, document.visibilityState: ${document.visibilityState}`);
        if (isVisible && (!this.player.pausedOk || this.PuasedVisibleOfMe)) {
            console.log("handleVisibilityChange...entrando a playing...")
            this.player.play();
            this.PuasedVisibleOfMe = false;
            document.title = "PlatziMediaPlayer";
        } else if (!isVisible && !this.player.pausedOk) {
            console.log("handleVisibilityChange...entrando a pausar...")
            this.player.pause();
            this.PuasedVisibleOfMe = true;
            document.title = "Paused PlatziMedia";
        }
    }

};

export default AutoPause;