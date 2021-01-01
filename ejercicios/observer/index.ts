interface Observer {
    update: (data: any) => void; 
}

interface Subject {
    subscribe: (observer: Observer) => void;
    unsubscribe: (observer: Observer) => void;
}

//crear una implementacion concreta
//BitcoinPrice, es la que va a estar recibiendo los cambios de precios, y luego le va a estar 
//informando a sus subscriptores mediante el observer
class BitcoinPrice implements Subject {  
    observers: Observer[] = [];  // es una lista de Observer que se inicializa vacia

    constructor() {
        //hacemos referencia al input del index.html
        const elemento: HTMLInputElement = document.querySelector('#value');

        //cada vez que value cambie su valor, vamos a quere notificar a todos los observers
        elemento.addEventListener('input', () => {
            this.notify(elemento.value);  //asi cambiamos el valor de notify, pero solo es cuando se crea la clase, que pasa cuando ya se creo?
        });
    };

    subscribe(observer: Observer) {
        this.observers.push(observer);
    };

    unsubscribe(observer: Observer) {  //hay que quitar el subscriptor que pide su baja
        //primero tenemos que encontrar el indice buscado del subscriptor a dar de baja
        //cada ejecucion de este callBack, va a recibir un observer (obs)
        const index = this.observers.findIndex(obs => {  //findindex, recibe una funcion que por cada observer va a comparar si hasta que sea true la condicion
            return obs === observer;  //una ez que coinciden findIndex, regresa el indice del observer obs correcto.
        });

        this.observers.splice(index, 1);  //a partir del indice cuandos elementos quieres sacar, en este caso solo 1 elemento.
    };

    //notificar el cambio de precio del bitcoin a todos los subscriptores
    //quien va a llamar a notify()? ese va a ser trabajo del input en index.html, 
    //para eso se pone un constructor aqui, para obtener una referencia de value, y
    //cada vez que value cambie su valor, vamos a quere notificar a todos los observers
    notify(data: any) {
        this.observers.forEach(observer => observer.update(data));
    };
}

//hay que desplegar el precio en el elemento price del index.html
class PriceDisplay implements Observer {
    private elemento: HTMLElement;

    constructor(subcriptor : string) {  //para tener mas de un subcriptor le agregue el argumento al constructor que reciba el nombre del subcriptor
        //this.elemento = document.querySelector('#price'); : subscriptor fijo
        //subscriptor dinamico
        this.elemento = document.querySelector('#'.concat(subcriptor));
    };

    //cada vez que se llame a update queremos que se cambie el valor del elemento, es decir, del elemento price en index.html 
    update(data: any) {
        this.elemento.innerText = formatterDolar.format(data);  //importante asignarlo a innerText
    };
}

//hasta aqui ya se tiene implementado el Subject y el Observer, ahora hay que hacer instancias para poder utilizarlas o subscribirlas
const value = new BitcoinPrice();
//const display = new PriceDisplay(); : se modifico para que pueda haber varios subscriptores
const display = new PriceDisplay('price');

//ahora hay que subscribir el display a los cambios de valor
value.subscribe(display);

//checando en el navegador, y en la consola...

//y si modifcamos el valor del bitcoin, se ve reflejado en o los subscritores, hasta ahorita solo hay uno.

//agregamos mas subscriptores
//para esto modificamos el index.html

const display2 = new PriceDisplay('priceS2');
const display3 = new PriceDisplay('priceS3');

//ahora hay que subscribir los nuevos subscrptore para que vean los cambios reflejados
value.subscribe(display2);
value.subscribe(display3);

//validamos en el navedaor y vemos que los 3 display (subscriptores se actualizan, cada vez que el precio del bitcoin se cambia)

//Ahora si queremos que deje de estar subcrito, es decir, deje de estar conectado, ya no esta conectado
// lo simularemos con un time out de 5 segundos

setTimeout( 
    () => value.unsubscribe(display), 5000
);

//como se ve en consola, el precio se actualiza, pero pasado 5 segundos ya no se ve actualizado, 
//debido a que el display o subscrptor ya se unsubscribe de la lista, ya cancelo la subscripcion.

//deja de actualizar display, pero display2 y display3, se siguen actualizando, porque el
//unico subscrptor que cancelo su subscrpcion fue display
//cada display tendria que cancelar su propia inscripcion.





//----------------------------------------------------------------------------
//codigo adicional para formatear la salida del precio de bitcoin.
const valor = 10000;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

console.log(formatter.format(valor));  // "$10,000

const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

console.log(formatterPeso.format(valor));  // → $ 12.500

 const formatterDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

console.log(formatterDolar.format(valor));   // → $12,500.00

const formatterEuro = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
});

console.log(formatterEuro.format(valor));  // → 12.500,00 €

// el yen japonés no tiene ninguna subdivisión
const formatterYenes = new Intl.NumberFormat("ja-JP", {
    style: 'currency',
    currency: 'JPY'
});

console.log(formatterYenes.format(valor));  // → ￥12,500

