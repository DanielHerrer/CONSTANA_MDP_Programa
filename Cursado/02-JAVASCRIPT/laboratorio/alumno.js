import Persona from "./Persona.js";

class Alumno extends Persona {

    constructor(nombre,apellido,edad,comision) {
        super(nombre,apellido,edad);
        this.commission = comision;
    }

    toString(){
        console.log(`${super().nombre}, ${this.commission}`);
    }
}