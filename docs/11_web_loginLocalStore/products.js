// Franco Daniel Herrera

const contentDiv = document.getElementById('content');
const loginButton = document.getElementById('btnLogin');
const registerButton = document.getElementById('btnRegister');
const logoutButton = document.getElementById('btnLogout');
const userButton = document.getElementById('btnUser');
const userName = document.getElementById('nameUser');

logoutButton.addEventListener('click', logout);
loginButton.addEventListener('click', showLoginForm);
registerButton.addEventListener('click', showRegisterForm);

// document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productTitle = button.closest('.card').querySelector('.card-title').textContent;
            const loggedInUser = localStorage.getItem('loggedInUser'); // Obtener el usuario logueado
            let userCart = JSON.parse(localStorage.getItem(loggedInUser)) || [];

            if (userCart.includes(productTitle)) {
                removeFromCart(button);
            } else {
                addToCart(button);
            }
        });
    });

    updateButtonsState(); // Actualizamos los botones en la carga inicial
    checkLoggedInStatus();

    function updateButtonsState() {
        const loggedInUser = localStorage.getItem('loggedInUser'); // Obtener el usuario logueado
        const userCart = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
        addToCartButtons.forEach(button => {
            const productTitle = button.closest('.card').querySelector('.card-title').textContent;
            if (!isLoggedIn) {
                button.classList.remove('added-to-cart');
                button.classList.add('disabled-btn');
                button.textContent = 'Añadir al Carrito';
                button.disabled = !isLoggedIn; // Deshabilitamos si el usuario no está logueado
            } else {
                button.disabled = !isLoggedIn;
                if (userCart.includes(productTitle)) {
                    button.classList.add('added-to-cart');
                    button.textContent = 'Añadido';
                } else {
                    button.classList.remove('added-to-cart');
                    button.textContent = 'Añadir al Carrito';
                }
            }
        });
    }

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
    
        checkLoggedInStatus();
        updateButtonsState();
    }
        
    function addToCart(button) {
        const productTitle = button.closest('.card').querySelector('.card-title').textContent;
        const loggedInUser = localStorage.getItem('loggedInUser'); // Obtener el usuario logueado
    
        let userCart = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        if (!userCart.includes(productTitle)) {
            userCart.push(productTitle);
            localStorage.setItem(loggedInUser, JSON.stringify(userCart));
        }
    
        updateButtonsState();
    }
    
    function removeFromCart(button) {
        const productTitle = button.closest('.card').querySelector('.card-title').textContent;
        const loggedInUser = localStorage.getItem('loggedInUser'); // Obtener el usuario logueado
    
        let userCart = JSON.parse(localStorage.getItem(loggedInUser)) || [];
        const index = userCart.indexOf(productTitle);
        if (index !== -1) {
            userCart.splice(index, 1);
            localStorage.setItem(loggedInUser, JSON.stringify(userCart));
        }
    
        updateButtonsState();
    }    
    
// });

// ----------------------------------------------------------------------------------

