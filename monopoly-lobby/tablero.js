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
    { nombre: "MUAK MUAK", precio: 600 },
    { nombre: "Besame el cuello", precio: 600 },
    { nombre: "Estación 1", precio: 2000 },
    { nombre: "Masaje Espalda", precio: 1200 },
    { nombre: "Besame Entero", precio: 1200 },
    { nombre: "Acariciame", precio: 1200 },
    { nombre: "Acaricia, Besa y Lame espalda", precio: 1400 },
    { nombre: "Cambiar Ropa", precio: 1500 },
    { nombre: "Manosea como Sabes", precio: 1400 },
    { nombre: "Estación 2", precio: 2000 },
    { nombre: "Lame de pie a parte intima", precio: 1800 },
    { nombre: "Tapa los OJOS y lleva mi mano", precio: 1800 },
    { nombre: "Adivina Juguete manos atadas y OJOS cerrados", precio: 2200 },
    { nombre: "Lame Empieza Por detras", precio: 2200 },
    { nombre: "Girate y siente la Lengua", precio: 2200 },
    { nombre: "Estación 3", precio: 2000 },
    { nombre: "Ojos vendados y juguete parte intima", precio: 2600 },
    { nombre: "SWITCH ROLES", precio: 1500 },
    { nombre: "69 o 96", precio: 2600 },
    { nombre: "Imagina y Recrea", precio: 2600 },
    { nombre: "Empieza Preliminar", precio: 3200 },
    { nombre: "Oral + Dedo Detras", precio: 3200 },
    { nombre: "Pon de rodillas", precio: 3200 },
    { nombre: "Estación 4", precio: 2000 },
    { nombre: "Oral + Babas", precio: 4000 },
    { nombre: "Inclinado Cama TOY / ORAL", precio: 4000 },
    { nombre: "Manosea por dentro Ropa", precio: 1800 }
];

// Generar cartas aleatorias
const cartasContainer = document.getElementById('cartasContainer');

function generarCartas() {
    // Mezclar las cartas aleatoriamente
    const cartasAleatorias = cartas.sort(() => 0.5 - Math.random());

    // Mostrar 27 cartas en pantalla
    for (let i = 0; i < 27; i++) {
        const cartaElement = document.createElement('div');
        cartaElement.classList.add('carta');

        // Crear el encabezado
        const cartaHeader = document.createElement('div');
        cartaHeader.classList.add('carta-header');
        cartaHeader.textContent = cartasAleatorias[i].nombre;

        // Asignar color de fondo al encabezado según el precio de la carta
        switch (cartasAleatorias[i].precio) {
            case 600:
                cartaHeader.style.backgroundColor = '#71635a'; // Marrón
                break;
            case 1200:
                cartaHeader.style.backgroundColor = '#ADD8E6'; // Azul claro
                break;
            case 1400:
                cartaHeader.style.backgroundColor = '#FFC0CB'; // Rosa
                break;
            case 1500:
                cartaHeader.style.backgroundColor = '#800080'; // Morado
                break;
            case 1800:
                cartaHeader.style.backgroundColor = '#FFA500'; // Naranja
                break;
            case 2000:
                cartaHeader.style.backgroundColor = '#D3D3D3'; // Gris
                break;
            case 2200:
                cartaHeader.style.backgroundColor = '#FF0000'; // Rojo
                break;
            case 2600:
                cartaHeader.style.backgroundColor = '#FFFF00'; // Amarillo
                break;
            case 3200:
                cartaHeader.style.backgroundColor = '#008000'; // Verde
                break;
            case 4000:
                cartaHeader.style.backgroundColor = '#00008B'; // Azul oscuro
                cartaHeader.style.color = '#c2c0c0'; // Cambiar color de letra a blanco
                break;                
            default:
                cartaHeader.style.backgroundColor = '#FFFFFF'; // Blanco por defecto
                break;
        }

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
        cartaElementOriginal.style.opacity = '1'; // Cambiar la opacidad para indicar que la carta ya fue usada
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


