// Franco Daniel Herrera

// Recibo los elementos
// const contentDiv = document.getElementById('content');
const loginButton = document.getElementById('btnLogin');
const registerButton = document.getElementById('btnRegister');
const logoutButton = document.getElementById('btnLogout');
const userButton = document.getElementById('btnUser');
const userName = document.getElementById('nameUser');

// Añado los eventos
logoutButton.addEventListener('click', logout);
loginButton.addEventListener('click', showLoginForm);
registerButton.addEventListener('click', showRegisterForm);

// Se inicia el javascript
checkLoggedInStatus();

function checkLoggedInStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const loggedInUser = localStorage.getItem('loggedInUser');
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'inline';
        userButton.style.display = 'inline';
        userName.innerText = `${loggedInUser}`;
    } else {
        loginButton.style.display = 'inline';
        registerButton.style.display = 'inline';
        logoutButton.style.display = 'none';
        userButton.style.display = 'none';
        userName.innerText = ``;
        userName.style.display = 'none';
    }
}

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener datos ingresados por el usuario
        const enteredUsername = loginForm.querySelector("#floatingInput").value;
        const enteredPassword = loginForm.querySelector("#floatingPassword").value;
        
        // Obtener usuarios almacenados en localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verificar si las credenciales coinciden
        const matchedUser = storedUsers.find(user => user.username === enteredUsername && user.password === enteredPassword);
        if (matchedUser) {
            alert("Inicio de sesión exitoso!");
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', matchedUser.username); // Almacenar el usuario logueado
            
            checkLoggedInStatus();

            window.location.reload();
        } else {
            alert("Usuario y/o contraseña incorrectas..");
        }
    });
}

function showRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener datos ingresados por el usuario
        const enteredUsername = registerForm.querySelector("#floatingInput").value;
        const enteredPassword = registerForm.querySelector("#floatingPassword").value;
        
        // Obtener usuarios almacenados en localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verificar si el usuario ya está registrado
        const existingUser = storedUsers.find(user => user.username === enteredUsername);
        if (existingUser) {
            alert("Usuario ya registrado..");
        } else {
            // Agregar nuevo usuario al array y guardar en localStorage
            storedUsers.push({ username: enteredUsername, password: enteredPassword });
            localStorage.setItem('users', JSON.stringify(storedUsers));
            alert("Registro exitoso!");
            
            window.location.reload();
        }
    });
}

function logout() {
    localStorage.removeItem('loggedInUser'); // Eliminar el usuario logueado
    localStorage.setItem('isLoggedIn', 'false');
    alert("Se ha cerrado sesión.");
    window.location.href = 'products.html';
    checkLoggedInStatus();
}

const title = document.getElementById('title');
const cartList = document.getElementById('cartList');
const buyButton = document.getElementById('buyButton');
const cleanButton = document.getElementById('cleanButton');

buyButton.addEventListener('click', finalizePurchase);
cleanButton.addEventListener('click', cleanPurchase);

function showCartItems() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let cartItems = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    cartList.innerHTML = '';

    title.innerHTML = `Carrito de compras de <span class="link-warning">${loggedInUser}</span>`;

    if (cartItems.length === 0) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `No hay ningún producto para comprar..`
        cartList.appendChild(li);
    }else{
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `${item}
                            <span class="badge bg-primary rounded-pill">PRECIO: $</span>`;
            cartList.appendChild(li);
        });
    }
}

function finalizePurchase() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let cartItems = JSON.parse(localStorage.getItem(loggedInUser)) || [];

    if (cartItems.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Realiza cualquier lógica necesaria para finalizar la compra.

    alert('Compra realizada con éxito. ¡Gracias por su compra!');

    // Limpia el carrito y redirige al usuario de vuelta a la página de productos.
    localStorage.removeItem(loggedInUser);
    showCartItems(); // Actualiza la visualización del carrito
}

function cleanPurchase() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    localStorage.removeItem(loggedInUser);
    showCartItems(); // Actualiza la visualización del carrito
}

showCartItems();