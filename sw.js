
const VERSION = "v1";

//antes de usar services worker, vale la pena conocer las herramientas que ofrecen los
//devTools para trabajar con services worker: en consola, pestaña Application, opcion Services Worker

//Los services workers los instala en la computadora del navegador, esto sucede tanto en desarrollo como en producción.

//cuando el navegador instale el services worker se va a ejecutar este event
self.addEventListener('install', event => {  //y el callback que va a a llamar va a recibir este event
    //lo primero que vamos a crear es un precache, es decir, todo lo que queremos que siempre este en cache y lo regrese al navegador
    //espera a que el precache se complete
    event.waitUntil(precache());
});

async function precache() {
    const cache = await caches.open(VERSION);  //regresa ua promesa , v1 es de version 1. con esto ya tenemos una instancia de cache
    
    //una vez que esta la instancia, se agregan los recursos de la cache.
    //el requeste de '/' es importante que se agregue, aunk parezca que es lo mismo que /index.html'
    cache.addAll( [
       /*  Se comenta estos archivos de precache, despues de empezar a usar Parcel (usar typescript) y cambiar la estension a ts, y que son diferente los nombres en la carpeta dist
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/MediaPlayer.js',
        '/assets/plugins/AutoPlay.js',
        '/assets/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/BigBuckBunny.mp4',  
        */   
    ] );
};

//el siguiente paso es hacer una peticion y que vaya a la cache para ver si encuentra la respuesta
//Por cada peticion el services worker validara la peticion
self.addEventListener('fetch', event => {
    const request = event.request;  //extraer la peticion
    //get, SOLO QUEREMOS TRBAJAR CON Las peticiones get, no queremos trabajar con los put, post, delete
    if (request.method !== "GET") {
        return ;
    }

    //buscar en la cache
    event.respondWith(cachedResponse(request));  //vamos a responder con uan respuesta cacheada

    //actualizar cache, mediante la técnica llamada cache-internet:
    event.waitUntil(updateCache(request));
});

async function cachedResponse(request) {
    const cache = await caches.open(VERSION);  //ya recuperamos la cache
    const response = await cache.match(request);  //le pregunta a la cache, ya tienes una copia que le corresponde al request?
    
    //como response puede regresar undefined, es ecir que no encontro nada, entonces se hace la peticion normal (ya no a la cache), REALIZA LA PETICION A INTERNET
    return response ||  fetch(request);  //IMPORTANTE: sino se regresa la ultima parte se quedaria sin respuesta la peticion, en caso de que fallara el llamado a la cache
};

async function updateCache(request) {
    console.log('dentro de updateCache...');
    const cache = await caches.open(VERSION);  // obtiene la cache guardada

    //buscamos una copia actualizada
    const response = await fetch(request);  //hace la peticion a internet o a network, no a la cache. Se debe poner try-catch para el caso de que no haya red?
    //como sabemos si hay o no red?
    

    //con esto siempre tiene la ultima version que hay en produccion
    //const nuevaCache = await cache.put(request, response);  //esa respuesta la sustituye por la copia cachada del request
    console.log("terminando dentro de updateCache...");
    return cache.put(request, response);  //esa respuesta la sustituye por la copia cachada del request
};

  /*IMPORTANTE:
  Si sale este errro, algo esta mal en el codigo
    DevTools failed to load SourceMap: Could not load content for 
    chrome-extension://fheoggkfdfchfphceeifdbepaooicaho/sourceMap/chrome/iframe_handler.map: 
    HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME

  */