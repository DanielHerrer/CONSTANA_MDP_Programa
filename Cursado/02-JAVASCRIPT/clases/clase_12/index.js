// metodos HTTPS => fetch("ejemplo.json",(method:"GET"));

// Obtener datos:               GET     /v1/empleados/1234
// Actualizar datos:            PUT     /v1/empleados/1234
// Crear un nuevo recurso;      POST    /v1/empleados/
// Borrar el recurso:           DELETE  /v1/empleados/1234  
// Actualizar ciertos datos:    PATCH 

const leerJson = async () => {
    let q = document.getElementById("filter").value;
    document.getElementById("dataItem").innerHTML = ''; // Se limpia la pantalla
    const response = await fetch("https://dummyjson.com/products/search?q="+q); // automaticamente get
    const data = await response.json();

    data.products.forEach(element => {
        document.getElementById("dataItem").innerHTML += `<p>${element.title}<img src="${element.thumbnail}"></p>`; // Añade cada producto
    });
    console.log(data);
}



leerJson();
