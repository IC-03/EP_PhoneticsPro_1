document.addEventListener('DOMContentLoaded', function(){
    const perfilLink = document.getElementById('perfilLink');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const dirUser = 'http://localhost:8094/api/Users/list/' + id;

    fetch(dirUser)
        .then(response => response.json())
        .then( data => {
            if (perfilLink && id) {
                perfilLink.textContent = 'Perfil de ' + data.name_user;
            }
        });
        perfilLink.href = '../html/perfil.html?id=' + id;
})

$(document).ready(function() {
    // Variables para el juego
    var gameMode;
    var timerInterval;
    var timeLimit;
    var words = ["apple", "banana", "cherry", "grape", "orange"];
    var wordsTyped = 0;
    var correctWordsCount = 0;
    var incorrectWordsCount = 0;
    var startTime;

    // Event listeners para los botones de opciones de tiempo
    $(".time-option").click(function() {
        var selectedTime = $(this).text();
        if (selectedTime.endsWith("s")) {
            gameMode = "against the clock";
            timeLimit = parseInt(selectedTime.slice(0, -1)); // Eliminar el "s" y convertir a número
        } else {
            gameMode = "take your time";
            timeLimit = parseInt(selectedTime);
        }
    });

    // Event listener para el botón de inicio
    $("#start-button").click(function() {
        if (gameMode === undefined) {
            alert("Por favor selecciona una modalidad de juego.");
            return;
        }

        startGame();
    });

    // Event listener para el botón de jugar de nuevo
    $("#restart-button").click(function() {
        location.reload(); // Recargar la página para iniciar el juego de nuevo
    });

    // Función para iniciar el juego
    function startGame() {
        wordsTyped = 0;
        correctWordsCount = 0;
        incorrectWordsCount = 0;
        $(".container").hide();
        $("#game-container").show();
        startTime = new Date().getTime();
        if (gameMode === "against the clock") {
            displayTimer(timeLimit * 1000); // Mostrar el tiempo límite en milisegundos
            startTime = new Date().getTime();
            timerInterval = setInterval(function() {
                var currentTime = new Date().getTime();
                var elapsedTime = Math.floor((currentTime - startTime) / 1000); // Convertir a segundos
                var remainingTime = timeLimit - elapsedTime;
                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    endGame();
                } else {
                    displayTimer(remainingTime * 1000); // Actualizar el temporizador cada segundo
                }
            }, 1000);
        } else {
            displayTimer(timeLimit * 1000); // Mostrar el tiempo límite en milisegundos
            updateElapsedTime(); // Comenzar a actualizar el tiempo transcurrido en tiempo real
        }
        displayNextWord();
        $("#word-input").focus();
    }

    // Función para mostrar el temporizador
    function displayTimer(time) {
        var minutes = Math.floor((time / (1000 * 60)) % 60);
        var seconds = Math.floor((time / 1000) % 60);
        var timeString = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        $("#game-timer").text("Tiempo restante: " + timeString);
    }

    // Función para finalizar el juego
    function endGame() {
        $("#game-container").hide();
        $("#result-container").show();
        var elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000); // Tiempo transcurrido en segundos
        var elapsedTimeString = formatTime(elapsedTime); // Convertir tiempo transcurrido a formato hh:mm:ss

        $("#result-time").text("Tiempo transcurrido: " + elapsedTimeString);
        $("#result-words").text("Palabras correctas: " + correctWordsCount + " / " + wordsTyped);
        $("#result-words").append("<br>Palabras incorrectas: " + incorrectWordsCount + " / " + wordsTyped);
    }

    // Función para convertir tiempo en segundos a formato hh:mm:ss
    function formatTime(timeInSeconds) {
        var hours = Math.floor(timeInSeconds / 3600);
        var minutes = Math.floor((timeInSeconds % 3600) / 60);
        var seconds = Math.floor(timeInSeconds % 60);
        return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    // Función para mostrar la siguiente palabra
    function displayNextWord() {
        $("#word-input").val('');
        var randomIndex = Math.floor(Math.random() * words.length);
        $("#game-words").text(words[randomIndex]);
    }

    // Función para actualizar el tiempo transcurrido en tiempo real
    function updateElapsedTime() {
        setInterval(function() {
            var currentTime = new Date().getTime();
            var elapsedTime = Math.floor((currentTime - startTime) / 1000); // Convertir a segundos
            var elapsedTimeString = formatTime(elapsedTime); // Convertir tiempo transcurrido a formato hh:mm:ss
            $("#game-timer").text("Tiempo transcurrido: " + elapsedTimeString);
        }, 1000);
    }

    // Event listener para la entrada de palabra
    $("#word-input").keypress(function(event) {
        if (event.which === 13) { // Tecla Enter presionada
            var typedWord = $(this).val().trim().toLowerCase();
            var randomWord = $("#game-words").text().trim().toLowerCase();
            if (typedWord === randomWord) {
                correctWordsCount++;
            } else {
                incorrectWordsCount++;
            }
            wordsTyped++;
            if (gameMode === "take your time" && wordsTyped >= timeLimit) {
                clearInterval(timerInterval); // Detener el cronómetro cuando se alcanza el límite de palabras
                endGame();
            } else {
                displayNextWord();
            }
        }
    });
});
