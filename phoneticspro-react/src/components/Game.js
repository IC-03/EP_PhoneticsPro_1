// Game.js
import React, { useState, useEffect } from 'react';
import { getWords, getDate_attempt, formatTime } from '../utils/GameUtils';

const Game = () => {
  /*
  const [words, setWords] = useState([]);
  const [gameMode, setGameMode] = useState(undefined);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timeLimit, setTimeLimit] = useState(null);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [term, transcription] = await getWords();
      setWords(term);
    };
    fetchData();
  }, []);

  const startGame = () => {
    setWordsTyped(0);
    setCorrectWordsCount(0);
    setIncorrectWordsCount(0);
    setStartTime(new Date().getTime());
    if (gameMode === "against the clock") {
      displayTimer(timeLimit * 1000);
      setStartTime(new Date().getTime());
      setTimerInterval(setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const remainingTime = timeLimit - elapsedTime;
        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          endGame();
        } else {
          displayTimer(remainingTime * 1000);
        }
      }, 1000));
    } else {
      displayTimer(timeLimit * 1000);
      updateElapsedTime();
    }
    displayNextWord();
    document.getElementById("word-input").focus();
  };

  const displayTimer = (time) => {
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const timeString = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    document.getElementById("game-timer").innerText = "Tiempo restante: " + timeString;
  };

  const endGame = () => {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    const elapsedTimeString = formatTime(elapsedTime);
    document.getElementById("result-time").innerText = "Tiempo transcurrido: " + elapsedTimeString;
    document.getElementById("result-words").innerText = "Palabras correctas: " + correctWordsCount + " / " + wordsTyped;
    document.getElementById("result-words").innerHTML += "<br>Palabras incorrectas: " + incorrectWordsCount + " / " + wordsTyped;
    //Enviar el resultado a la BD
    const id = new URLSearchParams(window.location.search).get('id');
    const dirUser = 'http://localhost:8094/api/Users/list/' + id;
    fetch(dirUser)
      .then(response => response.json())
      .then(data => {
        const attempt = {
          "total_attempt": wordsTyped,
          "correct_attempt": correctWordsCount,
          "date_attempt": getDate_attempt(),
          "id_user": {
            "id_user": id,
            "email": data.email,
            "password_user": data.password_user,
            "name_user": data.name_user
          }
        };
        const dirPostAttempt = 'http://localhost:8094/api/Attempt/';
        fetch(dirPostAttempt, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(attempt)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('No se pudo registrar el intento');
            }
            return response.json();
          })
          .then(data => {
            console.log('Intento registrado con éxito:', data);
          })
          .catch(error => {
            console.error('Error al registrar el intento:', error);
            alert('Ha ocurrido un error al registrar el intento');
          });
      });
  };

  const displayNextWord = () => {
    document.getElementById("word-input").value = '';
    const randomIndex = Math.floor(Math.random() * words.length);
    document.getElementById("game-words").innerText = words[randomIndex];
  };

  const updateElapsedTime = () => {
    setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      const elapsedTimeString = formatTime(elapsedTime);
      document.getElementById("game-timer").innerText = "Tiempo transcurrido: " + elapsedTimeString;
    }, 1000);
  };

  const handleKeyPress = (event) => {
    if (event.which === 13) { // Tecla Enter presionada
      const typedWord = event.target.value.trim().toLowerCase();
      const randomWord = document.getElementById("game-words").innerText.trim().toLowerCase();
      if (typedWord === randomWord) {
        setCorrectWordsCount(correctWordsCount + 1);
      } else {
        setIncorrectWordsCount(incorrectWordsCount + 1);
      }
      setWordsTyped(wordsTyped + 1);
      if (gameMode === "take your time" && wordsTyped >= timeLimit) {
        clearInterval(timerInterval);
        endGame();
      } else {
        displayNextWord();
      }
    }
  };

  const handleTimeOptionClick = (selectedTime) => {
    if (selectedTime.endsWith("s")) {
      setGameMode("against the clock");
      setTimeLimit(parseInt(selectedTime.slice(0, -1)));
    } else {
      setGameMode("take your time");
      setTimeLimit(parseInt(selectedTime));
    }
  };*/

  return (
    /*<div className="container mt-5" style={{ backgroundColor: "rgb(204, 204, 204)" }}>
      <div className="row mt-2 d-flex justify-content-center">
        <div className="col-md-10 m-2 p-3 text-center" style={{ backgroundColor: "#343a40", borderRadius: 10, color: "white" }}>
          <h2>Take your time</h2>
          <p>¿Cuánto tiempo te toma transcribir estas palabras?</p>
          <button className="btn btn-primary time-option custom-button" onClick={() => handleTimeOptionClick("10")}>10</button>
          <button className="btn btn-primary time-option custom-button" onClick={() => handleTimeOptionClick("25")}>25</button>
          <button className="btn btn-primary time-option custom-button" onClick={() => handleTimeOptionClick("40")}>40</button>
        </div>
      </div>
      <div className="row mt-2 d-flex justify-content-center">
        <div className="col-md-10 mb-2 p-3 text-center" style={{ backgroundColor: "#343a40", borderRadius: 10, color: "white" }}>
          <h2>Against the clock</h2>
          <p>¿Cuántas palabras logras transcribir?</p>
          <button className="btn btn-primary time-option custom-button" onClick={() => handleTimeOptionClick("15s")}>15s</button>
          <button className="btn btn-primary time-option custom-button" onClick={() => handleTimeOptionClick("30s")}>30s</button>
          <button className="btn btn-primary time-option custom-button" onClick={() => handleTimeOptionClick("60s")}>60s</button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 mb-2">
          <button className="btn btn-success btn-lg btn-block" id="start-button" onClick={startGame}>START</button>
        </div>
      </div>
      <div className="container mt-5 p-3" id="game-container" style={{ display: "none", backgroundColor: "rgb(204, 204, 204)" }}>
        <div className="text-center" id="game">
          <div className="p-2" id="game-timer" />
          <div className="p-2" id="game-words" />
          <input
            type="text"
            id="word-input"
            className="form-control"
            placeholder="Type here..."
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div className="container mt-5 p-3" id="result-container" style={{ display: "none", backgroundColor: "rgb(204, 204, 204)" }}>
        <div className="text-center">
          <h2>Resultado</h2>
          <p id="result-time" />
          <p id="result-words" />
          <button className="btn btn-success btn-lg" id="restart-button">Jugar de nuevo</button>
        </div>
      </div>
    </div>*/
    <div></div>
  );
};
export default Game;
