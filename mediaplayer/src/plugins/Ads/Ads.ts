//va a contener todos los Ads, que se van a estar mostrando.
//los videos, van a estar tomando los Ads de esta clase, pero existe la posibilidad
//de que esta clase sea utilizada en otras partes, no queremos 
//que los Ads no se dupliquen, aqui es muy util usar un Singleton
import JSONAds from './Ads.json';

export interface Ad {
    imageUrl: string;
    title: string;
    body: string;
    url: string;
}

const ALL_ADS: Ad[] = JSONAds;

class Ads {
    private static instance: Ads;
    private ads: Ad[];

    private constructor() {
        this.initAds();
    }

    static getInstance() {
        if ( !Ads.instance ) {
            Ads.instance = new Ads();
        }

        return Ads.instance;
    };

    private initAds() {
        //this.ads = ALL_ADS; // si se hace esto, cuando se haga pop, se van a sacar directamente, pero no queremos eso, por eso es bueno mantener una copia y dejar la original
        this.ads = [...ALL_ADS];  //esto permite copiar un arreglo y dejarlo caer en otro arreglo, eso es detructuracion (destructure)
    };

    getAd() {
        if (this.ads.length === 0) {  //se acabaron los Ads? se vuelven a incializar
            this.initAds();
        }
        return this.ads.pop();  //saca o elimina un elemento del arreglo
    };
}

export default Ads;

