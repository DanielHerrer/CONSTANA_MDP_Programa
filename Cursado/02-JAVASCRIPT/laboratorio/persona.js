/**
 * definir una clase (class)
 */

/** export default = permite ser importada */
export default class Persona {
    
    constructor(nombre,apellido,edad){
        // Al usar this. ya se crea automaticamente el atributo
        this.firstName = nombre;    
        this.lastName = apellido;
        this.age = edad;
    }

    setFirstName(nombre){
        this.firstName = nombre;
    }

    getFirstName(){
        return this.firstName;
    }

    static holaMundo() {
        console.log("Hola Mundo!");
    }

    #hola() { // # es un metodo privado
        console.log("Hola..");
    }

}

