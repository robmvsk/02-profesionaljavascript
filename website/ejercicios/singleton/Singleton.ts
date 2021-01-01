class Singleton {
    //hay 3 propiedades que distinguen al patron singleton:
    
    //tiene una instancia que es privada y es estatica
    private static instance: Singleton;

    //tiene un constructor pero privado
    private constructor() {
        //internamente puede inicializar propiedades publicas o privadas, eso no importa
        //aqui se inicializa las propiedades que sean necesarias
    }

    //obtener la instancia, mediante un metodo estatico, pero debemos regresar la misma instancia, siempre.
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}

export default Singleton;
