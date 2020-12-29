console.log('Hello, TypeScript');

function add(a: number, b: number) {  //se añade tipado a los argumentos
    return a + b;
}

const sum = add(2,3);  //sum va a ser un numero, type script hace un analisis estatico al codigo, y si hace la suma d e2 numeros, dara un numero. 
console.log(sum);

//bolean
let muted = true;
let paused: boolean = true;

paused = false;

//paused = "hola";  //sale error pq no es del mismo tipo, cosa que en javascript nunca saldria error

//numeros
let numerador: number = 42;
let denominador: number = 6;
let resultado = numerador / denominador;

let age = '6';
//denominador = age;  //nuevamente sale error pq no coinciden los tipos

//String
let nombre: string = 'Richard';
let saludo = `Me llamo ${nombre}`;

//arreglos, en java script se puede mezclar todos los elementos, 
//en typescript, puedes decidir, si los elementos seran combiandos de diferntes tipos o de un solo tipo.
let people: string[] = [];
people = ["Isabel", "Nicole", "Raul"];
//people.push(900);  // no se le puede asignar un numero
people.push("900");  // no se le puede asignar un numero

//arreglo con elementos con distintos tipos
let peopleAndNumbers: Array< string | number > = [];
peopleAndNumbers.push("ricardo");
peopleAndNumbers.push(10);

//Enum, es un conjunto de valores que son los unicos permitidos
enum Color {
    Rojo,
    Verde,
    Azul,
};

let colorFavorito: Color = Color.Rojo;  //obtiene la posicion en el arreglo
console.log(`mi color favorito es ${colorFavorito}`);  //mostrara la posicion del 0,1,2,3, n, en el enum, del dato seleccionado, en este caso imprimira CERO.
//trayendo el color sin necesidad de ser explicitos
let textoColorFavorito = Color[Color.Verde];  //obtiene el texto, de la posicion en el arreglo
console.log(`mi color favorito es ${Color[Color.Verde]}, ${textoColorFavorito}`);  //ahora mostrara el texto de cada color


enum Colores {
    Rojo = 'Rojo',
    Verde = 'Verde',
    Azul = 'Azul',
    amarillo = 'Amarillo',
};

let coloresFavoritos: Colores = Colores.Rojo;
console.log(`mi color favorito es ${coloresFavoritos}`);  //ahora si mostrara el valor de rojo que es la cadena 'Rojo'

//cuando NO tenemos la certeza de que tipo va a ser una variable type script ofrece
//any, puede ser cualquier tipo

let comodin: any = 'Hacker';  //en este caso es un string
comodin = { type: 'wildcard' };  //esa misma ahora es un objeto

//Object
let someObject = { type: 'wildcard' };  //declaracion implicita
let otherSomeObject: object = { type: 'wildcard' };  //declaracion especifica o explicitos

//Funciones
function suma(a: number, b: number): number {
    return a + b;
};

const addSum = suma(4, 6);
console.log(addSum);  //IMPORTANTE: para que se vea reflejado en el navegador, debes darle refresh o F5

//funciones que regresan otras funciones

//creador de suma
function createAdder ( a: number) {
    return function (b: number) {
        return b + a;
    }
};

const addFour = createAdder(4);
const fourPlus6 = addFour(6);

console.log(`addFour: ${addFour}, fourPlus6: ${fourPlus6}.`)

//anotando que funcion regresa, valor que toma y valor que regresa  (number) => number
function createAdder2 ( a: number): (number) => number {
    return function (b: number) {
        return b + a;
    }
};

const addFour_2 = createAdder2(4);
const fourPlus6_2 = addFour_2(6);

console.log(`addFour_2: ${addFour_2}, fourPlus6_2: ${fourPlus6_2}.`)


//funciones con parametros opcionales, no todos son obligatorios
function fullName(firstName: string, lastName?: string): string {  //poniendo ? al segundo argumento, le estamos diciendo que es opcional, es decir, puede tomar los valores de undefined o string
    return `${firstName}, ${lastName}`;
}

const pepe = fullName('Pepe', ' Mena'); 
const richard = fullName('Richard');  //marca error pq espera 2 argumentos, no solo uno, pero que pasa para cuando la persona no tiene apellido?
console.log(`nombre: ${pepe} / nombre: ${richard}`);  //la respuesta es:  nombre: Pepe,  Mena / nombre: Richard, undefined


//funciones con parametros con valores por default
function fullName(firstName: string, lastName: string = 'Smith'): string {  //poniendo ? al segundo argumento, le estamos diciendo que es opcional, es decir, puede tomar los valores de undefined o string
    return `${firstName}, ${lastName}`;
}


const maria = fullName('Maria', ' Perez'); 
const ricardo = fullName('Agente');  //marca error pq espera 2 argumentos, no solo uno, pero que pasa para cuando la persona no tiene apellido?
console.log(`nombre: ${maria} / nombre: ${ricardo}`);  //la respuesta es:  nombre: Maria, Perez / nombre: Agente, Smith


//interfaces
interface Rectangulo {  //cuando defines una interface se conviernte en un tipo de dato
    ancho: number;
    alto: number;
};

//si tenemos este contrato (rect)
let rect: Rectangulo = {  //sino se cumple con el contrato COMPLETO, marcara error
    ancho: 4,  
    alto: 6, //en caso de que alto no se declare, marca: Property 'alto' is missing in type '{ ancho: number; }' but required in type 'Rectangulo'.
    //largo:10,  //en caso de poner mas propiedades de las que tiene Rectangulo marca: is not assignable to type Rectangulo
};

function area( r: Rectangulo): number {
    return r.alto * r.ancho;
};

const areaRect = area(rect);
console.log(`areaRect: ${areaRect}`);

console.log(rect.toString());  //regresa:  [object Object]

//reescribir la funcion toString(): 

enum Colors {
    Rojo = 'Rojo',
    Verde = 'Verde',
    Azul = 'Azul',
    amarillo = 'Amarillo',
};

interface Rectangulo2 {  //cuando defines una interface se conviernte en un tipo de dato
    ancho: number;
    alto: number;
    color?: Colors;  //IMPORTANTE: el atributo es opcional
};

let rectangulo: Rectangulo2 = {  //sino se cumple con el contrato COMPLETO, marcara error
    ancho: 4,  
    alto: 6, //en caso de que alto no se declare, marca: Property 'alto' is missing in type '{ ancho: number; }' but required in type 'Rectangulo'.
    //largo:10,  //en caso de poner mas propiedades de las que tiene Rectangulo marca: is not assignable to type Rectangulo
    color: Colors.Rojo,  //como es opcional, no le ponemos color, comentar descomentar
};

rectangulo.toString = function () {
    return this.color ? `Un rectangulo ${this.color}` : 'Un rectangulo';
};

console.log(rectangulo.toString());  //regresa:  [object Object]


