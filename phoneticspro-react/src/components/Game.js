import React, { useState, useEffect, useRef } from "react";
import Keyboard from "./Keyboard";
import "../assets/css/game.css";
import audiobtn from "../assets/images/sonido.png";
import swal from "sweetalert";
import cronometro from "../assets/images/cronometro.png";
import tempo from "../assets/images/tempo.png";
import keyboardstyle from "../assets/css/keyboard.css";
import APIInvoke from "../utils/APIInvoke";

const Game = () => {
  const [gameMode, setGameMode] = useState(undefined);
  const [timeLimit, setTimeLimit] = useState(0);
  const [words, setWords] = useState([]);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultTime, setResultTime] = useState("");
  const [resultWords, setResultWords] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch("http://localhost:8094/api/Word/list");
        const data = await response.json();
        const term = data.map((palabra) => palabra.term);
        setWords(term);
      } catch (error) {
        console.error("Error al cargar las palabras", error);
        alert("Ha ocurrido un error, intente más tarde");
      }
    };

    fetchWords();
  }, []);

  const handleTimeOptionClick = (selectedTime) => {
    if (selectedTime.endsWith("s")) {
      setGameMode("against the clock");
      setTimeLimit(parseInt(selectedTime.slice(0, -1)));
    } else {
      setGameMode("take your time");
      setTimeLimit(parseInt(selectedTime));
    }
  };

  const startGame = () => {
    if (!gameMode) {
      swal(
        "Advertencia",
        "No se puede jugar si no has seleccionado ninguna opción",
        "warning"
      );
      return;
    }
    console.log("Starting game");
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setWordsTyped(0);
    setCorrectWordsCount(0);
    setIncorrectWordsCount(0);
    setIsGameActive(true);
    setShowResults(false);
    displayNextWord();
    if (gameMode === "take your time") {
      startChronometer();
    } else if (gameMode === "against the clock") {
      startTimer();
    }
  };

  const startChronometer = () => {
    console.log("Starting chronometer");
    timerRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);
  };

  const startTimer = () => {
    console.log("Starting timer");
    timerRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => {
        if (prevElapsedTime + 1 >= timeLimit) {
          clearInterval(timerRef.current);
          endGame();
        }
        return prevElapsedTime + 1;
      });
    }, 1000);
  };

  const endGame = () => {
    console.log("Ending game");
    clearInterval(timerRef.current);
    setIsGameActive(false);
  };

  useEffect(() => {
    if (!isGameActive && wordsTyped > 0) {
      const result = formatTime(elapsedTime);
      setResultTime(result);
      setResultWords(
        `Palabras correctas: ${correctWordsCount} / ${wordsTyped}\nPalabras incorrectas: ${incorrectWordsCount} / ${wordsTyped}`
      );
      console.log(`Result Time: ${result}`);
      console.log(
        `Result Words: Palabras correctas: ${correctWordsCount} / ${wordsTyped}, Palabras incorrectas: ${incorrectWordsCount} / ${wordsTyped}`
      );
      setShowResults(true);
    }
  }, [isGameActive, correctWordsCount, elapsedTime, incorrectWordsCount, wordsTyped]);

  const displayNextWord = () => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setCurrentWord(words[randomIndex]);
      console.log(`New word: ${words[randomIndex]}`);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.which === 13 && isGameActive) {
      processInput();
    }
  };

  const handleEnterPress = () => {
    if (isGameActive) {
      processInput();
    }
  };

  const processInput = () => {
    const typedWord = inputValue.trim().toLowerCase();
    const randomWord = currentWord.trim().toLowerCase();
    console.log(`Typed: ${typedWord}, Current: ${randomWord}`);
    if (typedWord === randomWord) {
      setCorrectWordsCount((prevCount) => prevCount + 1);
      console.log(`Correct words count: ${correctWordsCount + 1}`);
    } else {
      setIncorrectWordsCount((prevCount) => prevCount + 1);
      console.log(`Incorrect words count: ${incorrectWordsCount + 1}`);
    }
    setWordsTyped((prevCount) => prevCount + 1);
    console.log(`Words typed: ${wordsTyped + 1}`);
    setInputValue("");

    if (gameMode === "take your time" && wordsTyped + 1 >= timeLimit) {
      endGame();
    } else {
      displayNextWord();
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleDeleteCharacter = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    setInputValue("");
  };

  const handleCharacterInsert = (char) => {
    setInputValue((prev) => prev + char);
  };

  const getDate_attempt = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Se agrega 1 porque los meses van de 0 a 11
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  const SendAttempt = async () => {
    const user = await APIInvoke.invokeGET(`api/Users/list/${sessionStorage.getItem('id_user')}`);
    

    const data = {
      total_attempt: correctWordsCount + incorrectWordsCount,
      correct_attempt: correctWordsCount,
      date_attempt: getDate_attempt(),
      id_user: {
        id_user: user.id_user,
        email: user.email,
        password_user: user.password_user,
        name_user: user.name_user
      }
    };

    await APIInvoke.invokePOST(`api/Attempt/`, data);
  };

  return (
    <div>
      {!isGameActive && !showResults ? (
        <div
          className="container mt-4 mb-4 mode-selection"
          style={{
            backgroundColor: "rgb(204, 204, 204)",
            borderRadius: "10px",
          }}
        >
          <div className="row mt-2 d-flex justify-content-center">
            <div
              className="col-md-10 m-2 p-3"
              style={{
                backgroundColor: "#343a40",
                borderRadius: 10,
                color: "white",
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={cronometro}
                    alt="cronometro"
                    className="img-fluid"
                    style={{ maxWidth: "100px", marginRight: "20px" }}
                  />
                  <div className="text-center">
                    <h2>Take your time</h2>
                    <p>¿Cuánto tiempo te toma transcribir estas palabras?</p>
                    <div className="btn-opciones">
                      <button
                        className="btn btn-primary time-option custom-button"
                        onClick={() => handleTimeOptionClick("10")}
                      >
                        10
                      </button>
                      <button
                        className="btn btn-primary time-option custom-button"
                        onClick={() => handleTimeOptionClick("25")}
                      >
                        25
                      </button>
                      <button
                        className="btn btn-primary time-option custom-button"
                        onClick={() => handleTimeOptionClick("40")}
                      >
                        40
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 d-flex justify-content-center">
            <div
              className="col-md-10 mx-2 mb-2 p-3"
              style={{
                backgroundColor: "#343a40",
                borderRadius: 10,
                color: "white",
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={tempo}
                    alt="temporizador"
                    className="img-fluid"
                    style={{ maxWidth: "100px", marginRight: "20px" }}
                  />
                  <div className="text-center">
                    <h2>Against the clock</h2>
                    <p>¿Cuántas palabras logras transcribir?</p>
                    <div className="btn-opciones">
                      <button
                        className="btn btn-primary time-option custom-button"
                        onClick={() => handleTimeOptionClick("10s")}
                      >
                        10s
                      </button>
                      <button
                        className="btn btn-primary time-option custom-button"
                        onClick={() => handleTimeOptionClick("30s")}
                      >
                        30s
                      </button>
                      <button
                        className="btn btn-primary time-option custom-button"
                        onClick={() => handleTimeOptionClick("60s")}
                      >
                        60s
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 mb-3">
              <button
                className="btn btn-success btn-lg btn-block"
                id="start-button"
                onClick={startGame}
              >
                START
              </button>
            </div>
          </div>
        </div>
      ) : isGameActive ? (
        <div
          className="container mt-4 mb-4 p-2"
          id="game-container"
          style={{ backgroundColor: "rgb(204, 204, 204)", borderRadius: "10px" }}
        >
          <div className="text-center" id="game">
            <div className="p-2" id="game-timer">
              {gameMode === "take your time"
                ? "Tiempo transcurrido: "
                : "Tiempo restante: "}
              {formatTime(
                gameMode === "take your time"
                  ? elapsedTime
                  : Math.max(timeLimit - elapsedTime, 0)
              )}
            </div>
            <div
              className="p-2"
              id="game-words"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button className={`${keyboardstyle.bttn}$ bttn`}>
                <img
                  src={audiobtn}
                  alt="sonido"
                  style={{ width: 28, height: 28 }}
                />
              </button>
              <span style={{ marginLeft: "8px" }}>{currentWord}</span>
            </div>
            <input
              type="text"
              id="word-input"
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
              disabled={!isGameActive}
            />
            <Keyboard
              onCharacterInsert={handleCharacterInsert}
              onDelete={handleDeleteCharacter}
              onClear={handleClearAll}
              onEnter={handleEnterPress} // Pasa la función handleEnterPress como prop
            />
          </div>
        </div>
      ) : (
        <div
          className="container mt-5 p-3"
          style={{ backgroundColor: "rgb(204, 204, 204)" }}
        >
          <div className="text-center" id="result">
            <h2>Resultados</h2>
            <p id="result-time">{resultTime}</p>
            <p id="result-words">{resultWords}</p>
            <button
              className="btn btn-success"
              id="restart-button"
              onClick={() => {
                window.location.reload();
                SendAttempt();
              }}
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
