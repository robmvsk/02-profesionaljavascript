class Field{
    errors : string[];
    input: HTMLInputElement;

    constructor(input:HTMLInputElement) {
        this.input=input;
        this.errors=[];

        let errorMessage = document.createElement('p');
        errorMessage.className='text-danger';
        this.input.parentNode.insertBefore(errorMessage,this.input.nextSibling);

        this.input.addEventListener('input', () => {
            this.errors=[];
            this.validate();
            //agregue estas validaciones para que muestre los 2 posibles mensajes de error
            if (this.errors.length > 1) {  
                errorMessage.innerText = this.errors[0] || '\n' || this.errors[1] || '';  //este input se crea dinamicamente y es parent del input enviado
            }  else if (this.errors.length = 1) {
                errorMessage.innerText = this.errors[0] || '';  //este input se crea dinamicamente y es parent del input enviado. asignacion original
            }
            else {
                errorMessage.innerText = '';
            }
            
        });
    }
    validate(){}
}

function RequiredFieldDecorator(field: Field) : Field {
    //queremos guardar la funcion de validacion original
    let validate = field.validate;
    //despues de hacer la copia, vamos a extender la original
    field.validate = function() {
        //lo primero que hay que hacer es:

        //este decotator, no sabe que ha ocurrido antes de que field, llegara por aqui
        //es posible que otro decorador (que aunque aún no existe) alla hecho esta misma tecnica
        validate();  //super importante como primer paso, para darle prioridad que se agreguen los errores que hayan generado otros decoradores y despues siga con este decorador

        //paso 2.
        let value = field.input.value;
        if (!value) {
            field.errors.push('Requerido');
        }
    };  //este es el nuevo comportamiento de la funcion validate, pero de la instancia NO de la clase original.
    return field;
}

function EmailFieldDecorator(field: Field) : Field {
    //queremos guardar la funcion de validacion original
    let validate = field.validate;
    //despues de hacer la copia, vamos a extender la original
    field.validate = function() {
        //lo primero que hay que hacer es:

        //este decotator, no sabe que ha ocurrido antes de que field, llegara por aqui
        //es posible que otro decorador (que aunque aún no existe) alla hecho esta misma tecnica
        validate();  //super importante como primer paso, para darle prioridad que se agreguen los errores que hayan generado otros decoradores y despues siga con este decorador

        //paso 2.
        let value = field.input.value;
        if (value.indexOf("@") === -1) {  //indexOf No encontro el @, busca un caracter dentro de una cadena
            field.errors.push('Debe ser un email');
        }
    };  //este es el nuevo comportamiento de la funcion validate, pero de la instancia NO de la clase original.
    return field;
}

let field = new Field(document.querySelector('#email'));  //creamos un ainstancia, y vamos a decorar la instancia
field = RequiredFieldDecorator(field);  //decorando la instancia
field = EmailFieldDecorator(field);

//intercambia el llamado RequiredFieldDecorator e EmailFieldDecorator, para ver que pasa:  
//sale primero el error del primer decorator, ya que solo mostramos el primer error: linea 16



