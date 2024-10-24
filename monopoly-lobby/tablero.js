// Cargar los jugadores del lobby desde el localStorage
const players = JSON.parse(localStorage.getItem('players')) || [];
const playerLeft = document.getElementById('playerLeft');
const playerRight = document.getElementById('playerRight');
const playerCardsLeft = document.getElementById('playerCardsLeft');
const playerCardsRight = document.getElementById('playerCardsRight');

// Mostrar los nombres de los jugadores
function mostrarJugadores() {
    if (players.length > 0) {
        playerLeft.textContent = players[0]; // Asigna el primer jugador a la izquierda
        document.getElementById('playerNameLeft').textContent = players[0]; // Asigna el nombre a la columna izquierda
    }

    if (players.length > 1) {
        playerRight.textContent = players[1]; // Asigna el segundo jugador a la derecha
        document.getElementById('playerNameRight').textContent = players[1]; // Asigna el nombre a la columna derecha
    }
}

// Llamamos a la función para mostrar los jugadores
mostrarJugadores();

// Lista de cartas de Monopoly con precios
const cartas = [
    { nombre: "Calle del Prado", precio: 250 },
    { nombre: "Avenida de Neptuno", precio: 300 },
    { nombre: "Calle de Alcalá", precio: 400 },
    { nombre: "Gran Vía", precio: 500 },
    { nombre: "Plaza Mayor", precio: 350 },
    { nombre: "Calle Serrano", precio: 450 },
    { nombre: "Estación de Atocha", precio: 200 },
    { nombre: "Avenida de América", precio: 320 },
    { nombre: "Plaza de España", precio: 600 },
    { nombre: "Estación del Norte", precio: 180 },
    { nombre: "Calle de Vallehermoso", precio: 230 },
    { nombre: "Calle de Bravo Murillo", precio: 290 }
];

// Generar cartas aleatorias
const cartasContainer = document.getElementById('cartasContainer');

function generarCartas() {
    // Mezclar las cartas aleatoriamente
    const cartasAleatorias = cartas.sort(() => 0.5 - Math.random());

    // Mostrar 10 cartas en pantalla
    for (let i = 0; i < 10; i++) {
        const cartaElement = document.createElement('div');
        cartaElement.classList.add('carta');

        // Crear el encabezado
        const cartaHeader = document.createElement('div');
        cartaHeader.classList.add('carta-header');
        cartaHeader.textContent = cartasAleatorias[i].nombre;

        // Crear el contenido de la carta
        const cartaContent = document.createElement('div');
        cartaContent.classList.add('carta-content');
        cartaContent.textContent = `Precio: $${cartasAleatorias[i].precio}`;

        // Agregar encabezado y contenido a la carta
        cartaElement.appendChild(cartaHeader);
        cartaElement.appendChild(cartaContent);

        // Hacer la carta arrastrable
        cartaElement.setAttribute('draggable', true);
        cartaElement.addEventListener('dragstart', drag);
        
        // Agregar la carta al contenedor
        cartasContainer.appendChild(cartaElement);
    }
}

// Funciones de arrastrar y soltar
function allowDrop(ev) {
    ev.preventDefault(); // Permitir que se suelte la carta
}

function drag(ev) {
    // Guardar el id de la carta arrastrada
    ev.dataTransfer.setData("text/plain", ev.target.outerHTML);
}

function drop(ev, playerSide) {
    ev.preventDefault();

    const cartaHTML = ev.dataTransfer.getData("text/plain");

    // Buscar la carta original en el contenedor de cartas
    const cartasContainer = document.getElementById('cartasContainer');
    const cartaElementOriginal = Array.from(cartasContainer.children).find(carta => carta.outerHTML === cartaHTML);
    
    if (cartaElementOriginal) {
        // Añadir la carta al contenedor del jugador correspondiente
        const playerCardsContainer = playerSide === 'left' ? playerCardsLeft : playerCardsRight;
        playerCardsContainer.appendChild(cartaElementOriginal); // Mover la carta sin duplicarla

        // Marcar la carta como "usada" para que no se pueda seleccionar de nuevo
        cartaElementOriginal.setAttribute('draggable', false); // Deshabilitar arrastre en la carta original
        cartaElementOriginal.style.opacity = '0.5'; // Cambiar la opacidad para indicar que la carta ya fue usada
    }

    // Organizar las cartas en filas
    organizarCartas(playerSide);
}


// Organizar cartas en filas
function organizarCartas(playerSide) {
    const playerCardsContainer = playerSide === 'left' ? playerCardsLeft : playerCardsRight;
    const cartasJugador = playerCardsContainer.children;

    // Ajustar cada carta en la columna
    for (let i = 0; i < cartasJugador.length; i++) {
        const carta = cartasJugador[i];
        carta.style.flex = '0 0 calc(33.33% - 10px)'; // Ancho del 33% menos espacio entre cartas
    }
}

// Generar cartas al cargar la página
window.onload = () => {
    mostrarJugadores(); // Mostrar los jugadores
    generarCartas(); // Generar cartas
};

// Asignar eventos de arrastre a los contenedores de los jugadores
playerCardsLeft.addEventListener('dragover', allowDrop);
playerCardsRight.addEventListener('dragover', allowDrop);
playerCardsLeft.addEventListener('drop', (ev) => drop(ev, 'left'));
playerCardsRight.addEventListener('drop', (ev) => drop(ev, 'right'));


