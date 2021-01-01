import Singleton from './Singleton';

const a = Singleton.getInstance();
const b = Singleton.getInstance();

//validando que es una unica instancia
console.log(`A es igual a B? ${a === b}`);  //respuesta:  A es igual a B? true
