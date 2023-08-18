// Actividad realizada por Franco Daniel Herrera
const contentDiv = document.getElementById('content');
const searchInput = document.getElementById('searchUser');
const loginButton = document.getElementById('btnLogin');
const registerButton = document.getElementById('btnRegister');
const logoutButton = document.getElementById('btnLogout');

logoutButton.addEventListener('click', logout);
loginButton.addEventListener('click', showLoginForm);
registerButton.addEventListener('click', showRegisterForm);
searchInput.addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase();
    updateTable(searchText);
});

checkLoggedInStatus();

function checkLoggedInStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else if (isLoggedIn === 'false') {
        loginButton.style.display = 'inline';
        registerButton.style.display = 'inline';
        logoutButton.style.display = 'none';
    }
    // Actualizar la tabla con los datos de usuarios
    updateTable();
}

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        
        // Obtener datos ingresados por el usuario
        const enteredUsername = loginForm.querySelector("#floatingInput").value;
        const enteredPassword = loginForm.querySelector("#floatingPassword").value;
        
        // Obtener usuarios almacenados en localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verificar si las credenciales coinciden
        const matchedUser = storedUsers.find(user => user.username === enteredUsername && user.password === enteredPassword);
        if (matchedUser) {
            alert("Logeo exitoso!");
            localStorage.setItem('isLoggedIn', 'true');
            checkLoggedInStatus();
            closeModal('modalLogin');
        } else {
            alert("Usuario o contraseña incorrectas..");
        }
    });
}

function showRegisterForm() {

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        
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
            closeModal('modalRegister');
            
            // Actualizar la tabla con los datos de usuarios
            updateTable();
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.remove();
    }
}

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    alert("Se ha cerrado sesión.");

    checkLoggedInStatus();
}

function updateTable() {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('tbody');
    
    // Limpiar contenido actual de la tabla
    tbody.innerHTML = '';
    
    // Agregar nuevas filas a la tabla
    storedUsers.forEach((user, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.username}</td>
            <td>${user.password}</td>
        `;
        tbody.appendChild(newRow);
    });
}

function updateTable(searchText = '') {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('tbody');
    
    // Limpiar contenido actual de la tabla
    tbody.innerHTML = '';
    
    // Agregar nuevas filas a la tabla
    storedUsers.forEach((user, index) => {
        // Filtrar usuarios por búsqueda
        if (user.username.toLowerCase().includes(searchText)) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${user.username}</td>
                <td>${user.password}</td>
            `;
            tbody.appendChild(newRow);
        }
    });
}