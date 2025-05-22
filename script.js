document.addEventListener('DOMContentLoaded', function() {
    let libros = [];
    let carrito = [];
    
    const formAgregarLibro = document.getElementById('formAgregarLibro');
    const listaLibros = document.getElementById('listaLibros');
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    
    formAgregarLibro.addEventListener('submit', agregarLibro);
    
    //Funciones    
    function agregarLibro(e) {
        e.preventDefault();
        
        const titulo = document.getElementById('titulo').value;
        const precio = parseFloat(document.getElementById('precio').value);
        
        if (titulo.trim() === '' || isNaN(precio) || precio <= 0) {
            alert('Por favor ingrese un título y un precio válido');
            return;
        }
        
        const nuevoLibro = {
            id: Date.now(),
            titulo,
            precio
        };
        
        libros.push(nuevoLibro);
        mostrarLibros();
        formAgregarLibro.reset();
    }
    
    function mostrarLibros() {
        listaLibros.innerHTML = '';
        
        libros.forEach(libro => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${libro.titulo} - $${libro.precio.toFixed(2)}
                <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
            `;
            listaLibros.appendChild(li);
        });
    }
    
    window.agregarAlCarrito = function(id) {
        const libro = libros.find(l => l.id === id);
        
        if (libro) {
            carrito.push(libro);
            mostrarCarrito();
            calcularTotal();
        }
    }
    
    function mostrarCarrito() {
        listaCarrito.innerHTML = '';
        
        carrito.forEach((libro, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${libro.titulo} - $${libro.precio.toFixed(2)}
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
        });
    }
    
    window.eliminarDelCarrito = function(index) {
        carrito.splice(index, 1);
        mostrarCarrito();
        calcularTotal();
    }
    
    function calcularTotal() {
        const total = carrito.reduce((sum, libro) => sum + libro.precio, 0);
        totalCarrito.textContent = total.toFixed(2);
    }
});
