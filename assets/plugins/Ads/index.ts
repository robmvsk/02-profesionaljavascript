//aqui es donde se va aimplementar el Plugin de Ads

import MediaPlayer from '../../MediaPlayer';
import Ads, { Ad } from './Ads';

class AdsPlugin {
    private ads: Ads;
    private player: MediaPlayer;
    private media: HTMLMediaElement;
    private currentAd: Ad;  //es la interface que representa a un Ad.
    //contenedor de los Ads, que a su vez va a estar dentro del contenedor de MediaPlayer
    private adsContainer: HTMLElement;

    constructor() {
        this.ads = Ads.getInstance();
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);  //le asigna permanentemente el this de la clase
        //creando el contenedor de los Ads:
        this.adsContainer = document.createElement('div');  //nuevo contenedor
    };

    run(player: MediaPlayer) {
        this.player = player;
        this.media = this.player.media;

        //los HTMLMediaElement tiene un evento llamado timeUpdate() y que ocurre
        //cada 'x' tiempo, y sirve para tomar difernetes acciones antes de continuar el video o audio
        this.media.addEventListener('timeupdate', this.handleTimeUpdate); //tenemos el problema del this, que aqui es media, no la clase AdsPlugin, se corrigue con e contructor asignandole siempre el this correcto
        
        //el contenedor de los Ads, se vuelve parte del contenedor del MediaPlayer
        this.player.container.appendChild(this.adsContainer);
    
    };

    private handleTimeUpdate() {
        //cada 30 segs, vamos a desplegar un nuevo Ads
        const currentTime = Math.floor(this.media.currentTime);  //quita los decimales
        if (currentTime % 30 === 0) {
            this.renderAd();
        }
    };

    private renderAd() {
        if (this.currentAd) {  //esto es parte de la segunda implementacion. Ya tenemos un currentAd, NO mostremos otro
            return;
        };

        const ad = this.ads.getAd();  //tomamos un nuevo Ads
    //    console.log(`El nuevo Ad sera:\n ${ad.body}`);  //la respuesta es:  4 El nuevo Ad sera: [object Object], lo imprime varias veces, es decir el curentTime ocurre varias veces
        //vamos a tener que llevar un registro de cual es el Ad actual
        this.currentAd = ad;
    //    console.log(`El nuevo Ad sera:\n ${this.currentAd.body}`);

        //todos los AdsContainer tiene un link
        //CUANDO LE DAS CLICK AL Adscontainer se va al link asociado al Ads.
        this.adsContainer.innerHTML = `
            <div class="ads">
                <a  class="ads__link" href="${this.currentAd.url}" target="_blank">
                    <img class="ads__img" src="${this.currentAd.imageUrl}" />
                    <div class="ads__info">
                        <h5 class="ads__title">${this.currentAd.title}</h5>
                        <p class="ads__body">${this.currentAd.body}</p>
                    </div>
                </a>
            </div>
        `;

        //El Ads, no lo queremos tener por siempre, queremos que despues de 10 segundos se quite
        //la primera vez, no hay Ads, (despues de 30 segundos) pero la 2da vez ya hay un Ads que no se ha quitado, por lo tanto
        //necesitamos un mecanismo que quite el Ads que se mostro durante X segundos.

        setTimeout( () => {
            this.currentAd = null; //va a quitar el Ads
            this.adsContainer.innerHTML = ''; //su html interno lo va a quitar, asi se vacia el Ads y desaparece el Ads.
        }, 10000);

    };
}

export default AdsPlugin;

