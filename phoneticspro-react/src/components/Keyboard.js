import React from "react";
import keyboardstyle from "../assets/css/keyboard.css";

const Keyboard = ({ onCharacterInsert, onDelete, onClear, onEnter }) => {
  const characters = [
    ["i", "ɪ", "ʊ", "u", "ɪ", "ə", "ɛ", "æ", "ɑ", "ɒ"],
    ["ɔ", "ʌ", "aɪ", "aʊ", "eɪ", "oʊ", "oɪ", "ɜɪ", "ɜə", "ɑɪ"],
    ["ɑʊ", "eɪ", "oʊ", "p", "b", "t", "d", "k", "g"],
    ["ʔ", "m", "n", "ŋ", "f", "v", "θ", "ð", "s"],
    ["z", "ʃ", "ʒ", "h", "ʧ", "ʤ", "l", "r", "w"],
    ["j", "ʍ", "ʔ"],
  ];

  return (
    <div className={`${keyboardstyle.keyboard}$ keyboard`}>
      {characters.map((row, rowIndex) => (
        <div className={`${keyboardstyle.row}$ row`} key={rowIndex}>
          {row.map((char, charIndex) => (
            <button
              key={`${rowIndex}-${charIndex}`}
              className={`${keyboardstyle.bttn}$ bttn`}
              onClick={() => onCharacterInsert(char)}
            >
              {char}
            </button>
          ))}
        </div>
      ))}
      <div className={`${keyboardstyle.bttn}$ row`}>
        <button className={`${keyboardstyle.bttn}$ keys grey`} onClick={onDelete}>
          Borrar
        </button>
        <button
          className={`${keyboardstyle.bttn}$ keys grey`}
          onClick={onEnter}
        >
          Enviar
        </button>
        <button
          className={`${keyboardstyle.bttn}$ keys grey`}
          onClick={() => onCharacterInsert(" ")}
        >
          Space
        </button>
        <button
          className={`${keyboardstyle.bttn}$ keys grey`}
          onClick={onClear}
        >
          Limpiar todo
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
