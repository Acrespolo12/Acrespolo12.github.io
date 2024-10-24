// Generar un ID único para el lobby
function generateLobbyID() {
    return Math.random().toString(36).substring(2, 8);  // Genera un ID alfanumérico de 6 caracteres
}

// Lógica para crear un lobby
const createLobbyButton = document.getElementById('createLobbyButton');
const generatedLobbyID = document.getElementById('generatedLobbyID');
const lobbyInfo = document.getElementById('lobbyInfo');
const createLobby = document.getElementById('createLobby');
const joinLobby = document.getElementById('joinLobby');
const playerNameInput = document.getElementById('playerNameInput');

// Cuando se hace clic en "Crear un lobby"
createLobbyButton.addEventListener('click', () => {
    const playerName = playerNameInput.value;
    if (playerName === "") {
        alert('Por favor, introduce tu nombre.');
        return;
    }

    const lobbyID = generateLobbyID();  // Genera un nuevo ID
    localStorage.setItem('lobbyID', lobbyID);  // Guarda el ID en localStorage para compartir
    localStorage.setItem('playerName', playerName);  // Guarda el nombre del jugador en localStorage

    let players = [playerName];  // El creador del lobby es el primer jugador
    localStorage.setItem('players', JSON.stringify(players));  // Guarda los jugadores

    generatedLobbyID.textContent = lobbyID;  // Muestra el ID en pantalla
    createLobby.classList.add('hidden');  // Oculta el botón de crear lobby
    lobbyInfo.classList.remove('hidden');  // Muestra la información del lobby
    joinLobby.classList.add('hidden');  // Oculta la opción de unirse a un lobby
});

// Unirse a un lobby
const joinLobbyForm = document.getElementById('joinLobbyForm');
joinLobbyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const enteredLobbyID = document.getElementById('lobbyID').value;
    const playerName = playerNameInput.value;

    if (playerName === "") {
        alert('Por favor, introduce tu nombre.');
        return;
    }

    // Verifica si el lobby ID es válido
    if (enteredLobbyID) {
        localStorage.setItem('joinedLobbyID', enteredLobbyID);  // Guarda el ID del lobby al que te has unido
        localStorage.setItem('playerName', playerName);  // Guarda el nombre del jugador en localStorage

        // Recupera la lista de jugadores en el lobby y añade el nuevo jugador
        let players = JSON.parse(localStorage.getItem('players')) || [];
        players.push(playerName);
        localStorage.setItem('players', JSON.stringify(players));

        alert(`Te has unido al lobby: ${enteredLobbyID}`);
        // Redirigir al tablero
        window.location.href = "tablero.html";
    } else {
        alert('Por favor, introduce un ID de lobby válido.');
    }
});

// Iniciar el juego
const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', () => {
    const lobbyID = localStorage.getItem('lobbyID');  // Recupera el ID del lobby creado
    if (lobbyID) {
        alert(`El juego ha comenzado en el lobby: ${lobbyID}`);
        // Redirigir a la página del tablero
        window.location.href = "tablero.html";
    }
});
