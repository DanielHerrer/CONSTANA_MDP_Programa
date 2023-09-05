// Se recibe la etiqueta <script> del html
const script = document.querySelector('script[src="index.js"]');
// Creamos array con url's de imagenes traidas como atributo de la etiqueta <script>
const imagenes = JSON.parse(script.getAttribute('data'));
console.log(imagenes);

// const imagenesSrc = [
//     "img/pic_1.jpg",
//     "img/pic_2.jpg",
//     "img/pic_3.jpg",
//     "img/pic_4.jpg",
//     "img/pic_5.jpg",
//     "img/pic_6.jpg",
//     "img/pic_7.jpg",
//     "img/pic_8.jpg",
//     "img/pic_9.jpg",
//     "img/pic_10.jpg"];

let imagenesVolteadas = [];
let paresEncontrados = 0;
let intentos = 6;

const gridItems = document.querySelectorAll(".grid-item");
const intentosDisplay = document.querySelector(".intentos");

function clickear(gridItem) {
    console.log("click "+gridItem)
    // Del casillero se recibe la imagen y se le asigna 'src' concatenando su 'alt'
    let img = gridItem.querySelector("img");
    img.setAttribute("src",`img/pic_${img.alt}.jpg`);

    // Si hay menos de 2 casilleros volteados Y el casillero actual NO esta volteado
    if (imagenesVolteadas.length < 2 && !gridItem.classList.contains("volteada")) {
        // Se le asigna al casillero la clase 'volteada'
        gridItem.classList.add("volteada");
    
        // Nos llevamos el 'alt' de la imagen del casillero para guardarlo en un array
        let imgIndex = img.alt;
        imagenesVolteadas.push(imgIndex);

        // Si ya hay 2 casilleros volteados
        if (imagenesVolteadas.length === 2) {
            verificarPar();
        }
    }
}

function verificarPar() {
    let img1 = imagenesVolteadas[0];
    let img2 = imagenesVolteadas[1];

    if (img1 === img2) {
        imagenesVolteadas = [];
        paresEncontrados++;

        if (paresEncontrados === imagenes.length / 2) {
            setTimeout(function() {
                Swal.fire({
                    title: "¡Has ganado!",
                    text: "¿Quieres jugar de nuevo?",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Sí",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result.isConfirmed) {
                        resetGame();
                    }else{
                        gridItems.forEach(function(gridItem) {
                            // Remover el evento click de cada casillero
                            gridItem.removeAttribute("onclick");
                        });
                    }
                });
            }, 1000);
        }
    } else {

        imagenesVolteadas = [];
        intentos--;
        
        gridItems.forEach(function(gridItem) {
            const gridImg = gridItem.querySelector("img");
            if (gridImg){
                let url = gridImg.alt;  

                if (url === img1 || url === img2){
                    setTimeout(function() {
                        gridImg.setAttribute("src", 'img/pic_0.jpg');
                        gridItem.classList.remove("volteada");
                    }, 1000);

                }
            }

        });

        if (intentos === 0) {
            setTimeout(function() {
                Swal.fire({
                    title: "¡Has perdido!",
                    text: "¿Quieres jugar de nuevo?",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonText: "Sí",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result.isConfirmed) {
                        resetGame();
                    }else{
                        gridItems.forEach(function(gridItem) {
                            // Remover el evento click de cada casillero
                            gridItem.removeAttribute("onclick");
                        });
                    }
                });
            }, 1000);
        }
    }

    intentosDisplay.textContent = `Intentos restantes: ${intentos}`;
}

function resetGame() {
    gridItems.forEach(function(gridItem) {
        gridItem.classList.remove("volteada");
    });

    imagenesVolteadas = [];
    paresEncontrados = 0;
    intentos = 6;
    intentosDisplay.textContent = `Intentos restantes: ${intentos}`;
    mezclarImagenes();
}

// Funcion que retorna los numeros de un string, acorde para los url de las imagenes
function numeroDeImagen(url) {
    let num = "";
    for(let i=0; i<url.length; i++){
        let caracter = url.substring(i,i+1);
        if(!isNaN(parseInt(caracter))){
            num += caracter;
        }
    }
    return num;
}

// Funcion que mezcla y asigna las imagenes a los casilleros
function mezclarImagenes() {

    imagenes.sort(function() {
        return Math.random() - 0.5; // Función de comparación aleatoria
    });

    // Se usa un indice auxiliar para ir recorriendo imagen por imagen
    let indice = 0;

    gridItems.forEach(function(gridItem) {
        const img = gridItem.querySelector("img");
        // Se le asigna 'alt' a cada imagen con el numero de su url (ej: img/pic_10.jpg => 10)
        img.setAttribute("alt", `${numeroDeImagen(imagenes[indice])}`);
        indice++;
        // Se le asigna 'src' con un url de una imagen incognito, luego se usará 'alt' para revelar su verdadera imagen
        img.setAttribute("src", "img/pic_0.jpg");
    });
}

// Se inicia el javascript
mezclarImagenes();