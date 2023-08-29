

/** async - await
 *  await detiene la ejecucion
 */

const responseData = async() => {
    const response = await fetch("url...");
    const data = await response.text();
}

/** try catch throw
 * 
 */

const validar = () => {
    let inputs = document.getElementById("inputs");
    let errorMessage = document.getElementById("errorMessage");
    
    try{
        if(inputs.trim() == "") throw "no ingreso nada";
        if(isNaN(inputs())) throw "el ingresado no es numero";

    }catch(error){
        console.log(error);
        errorMessage.innerHTML = error.message;
    }
}