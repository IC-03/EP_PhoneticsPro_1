import React from "react";
import "../assets/css/keyboard.css";
import { insertCharacter, insertSpace, deleteCharacter, clearAll } from "../utils/KeyboardUtils.js";

const Keyboard = () => {
  return (
    <div
      className="container mt-5 p-3"
      id="game-container"
      style={{ display: "none", backgroundColor: "rgb(204, 204, 204)" }}
    >
      <div className="text-center" id="game">
        <div className="p-2" id="game-timer" />
        <div className="p-2" id="game-words" />
        <input
          type="text"
          id="word-input"
          className="form-control"
          placeholder="Type here..."
        />
        <div className="keyboard">
          {/* <textarea id="input" rows="4" cols="50"></textarea> */}
          <div className="keys">
            <div className="row">
              <button className="green" onclick={() =>insertCharacter('i')}>
                i
              </button>
              <button className="blue" onclick={() =>insertCharacter('ɪ')}>
                ɪ
              </button>
              <button className="purple" onclick={() =>insertCharacter('ʊ')}>
                ʊ
              </button>
              <button className="orange" onclick={() =>insertCharacter('u')}>
                u
              </button>
              <button className="red" onclick={() =>insertCharacter('ɪ')}>
                ɪ
              </button>
              <button className="yellow" onclick={() =>insertCharacter('ə')}>
                ə
              </button>
              <button className="pink" onclick={() =>insertCharacter('ɛ')}>
                ɛ
              </button>
              <button className="teal" onclick={() =>insertCharacter('æ')}>
                æ
              </button>
              <button className="cyan" onclick={() =>insertCharacter('ɑ')}>
                ɑ
              </button>
              <button className="indigo" onclick={() =>insertCharacter('ɒ')}>
                ɒ
              </button>
            </div>
            <div className="row">
              <button className="green" onclick={() =>insertCharacter('ɔ')}>
                ɔ
              </button>
              <button className="blue" onclick={() =>insertCharacter('ʌ')}>
                ʌ
              </button>
              <button className="purple" onclick={() =>insertCharacter('aɪ')}>
                aɪ
              </button>
              <button className="orange" onclick={() =>insertCharacter('aʊ')}>
                aʊ
              </button>
              <button className="red" onclick={() =>insertCharacter('eɪ')}>
                eɪ
              </button>
              <button className="yellow" onclick={() =>insertCharacter('oʊ')}>
                oʊ
              </button>
              <button className="pink" onclick={() =>insertCharacter('oɪ')}>
                oɪ
              </button>
              <button className="teal" onclick={() =>insertCharacter('ɜɪ')}>
                ɜɪ
              </button>
              <button className="cyan" onclick={() =>insertCharacter('ɜə')}>
                ɜə
              </button>
              <button className="indigo" onclick={() =>insertCharacter('ɑɪ')}>
                ɑɪ
              </button>
            </div>
            <div className="row">
              <button className="green" onclick={() =>insertCharacter('ɑʊ')}>
                ɑʊ
              </button>
              <button className="blue" onclick={() =>insertCharacter('eɪ')}>
                eɪ
              </button>
              <button className="purple" onclick={() =>insertCharacter('oʊ')}>
                oʊ
              </button>
              <button className="orange" onclick={() =>insertCharacter('p')}>
                p
              </button>
              <button className="red" onclick={() =>insertCharacter('b')}>
                b
              </button>
              <button className="yellow" onclick={() =>insertCharacter('t')}>
                t
              </button>
              <button className="pink" onclick={() =>insertCharacter('d')}>
                d
              </button>
              <button className="teal" onclick={() =>insertCharacter('k')}>
                k
              </button>
              <button className="cyan" onclick={() =>insertCharacter('g')}>
                g
              </button>
            </div>
            <div className="row">
              <button className="green" onclick={() =>insertCharacter('ʔ')}>
                ʔ
              </button>
              <button className="blue" onclick={() =>insertCharacter('m')}>
                m
              </button>
              <button className="purple" onclick={() =>insertCharacter('n')}>
                n
              </button>
              <button className="orange" onclick={() =>insertCharacter('ŋ')}>
                ŋ
              </button>
              <button className="red" onclick={() =>insertCharacter('f')}>
                f
              </button>
              <button className="yellow" onclick={() =>insertCharacter('v')}>
                v
              </button>
              <button className="pink" onclick={() =>insertCharacter('θ')}>
                θ
              </button>
              <button className="teal" onclick={() =>insertCharacter('ð')}>
                ð
              </button>
              <button className="cyan" onclick={() =>insertCharacter('s')}>
                s
              </button>
            </div>
            <div className="row">
              <button className="green" onclick={() =>insertCharacter('z')}>
                z
              </button>
              <button className="blue" onclick={() =>insertCharacter('ʃ')}>
                ʃ
              </button>
              <button className="purple" onclick={() =>insertCharacter('ʒ')}>
                ʒ
              </button>
              <button className="orange" onclick={() =>insertCharacter('h')}>
                h
              </button>
              <button className="red" onclick={() =>insertCharacter('ʧ')}>
                ʧ
              </button>
              <button className="yellow" onclick={() =>insertCharacter('ʤ')}>
                ʤ
              </button>
              <button className="pink" onclick={() =>insertCharacter('l')}>
                l
              </button>
              <button className="teal" onclick={() =>insertCharacter('r')}>
                r
              </button>
              <button className="cyan" onclick={() =>insertCharacter('w')}>
                w
              </button>
            </div>
            <div className="row">
              <button className="green" onclick={() =>insertCharacter('j')}>
                j
              </button>
              <button className="blue" onclick={() =>insertCharacter('ʍ')}>
                ʍ
              </button>
              <button className="purple" onclick={() =>insertCharacter('ʔ')}>
                ʔ
              </button>
            </div>
            <div className="row">
              <button className="grey" onclick={() =>insertSpace()}>
                Space
              </button>
              <button className="grey" onclick={() =>deleteCharacter()}>
                Borrar
              </button>
              <button className="grey" onclick={() =>clearAll()}>
                Limpiar todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
