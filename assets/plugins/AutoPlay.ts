import MediaPlayer from "../MediaPlayer";

//el quick Fix, solo funciona con visual Studio code: MUY IMPORTANTE
class AutoPlay {
    constructor() { }
    run(player: MediaPlayer) { //si marca : Type annotations can only be used in TypeScript files, es pq NO se ha cambiado la extension a .ts
        /*
        sin el mute, sale este error:
        MediaPlayer.js:17 Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
        Debido a las restricciones establecidas por los navegadores, y que debe haber sido solicitado por el usuario
        PERO hay una exception a la regla: si el video esta en mute,
        entonces si se puede auto reproducir
        */
        /* lECCION 17, Se cambia la forma de usar el mute, ahora lo haremos mediante setter y getter
        player.mute();
        */
        //se usa el getter para saber que valor tiene la variable virtual.
        //con typeScript, ahora ya podemos usarlas mediante media
        if (!player.media.muted) { //recordando que el player, ya no trae todos los metodos expuestos, entre ellos el mute(), se usa ahora el getter
            player.media.muted = true; //se utiliza el setter para asignarle el nuevo valor
        }

        player.play();
    }
}  //IMPORTANTE: para que muestre el quick fix, es necesario que el archivo sea .js y lo convierta a class


export default AutoPlay;