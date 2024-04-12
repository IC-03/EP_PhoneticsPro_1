function insertCharacter(character) {
  document.getElementById('word-input').value += character;
}

function insertSpace() {
  document.getElementById('word-input').value += ' ';
}

function deleteCharacter() {
  var input = document.getElementById('word-input').value;
  document.getElementById('word-input').value = input.slice(0, -1);
}

function clearAll() {
  document.getElementById('word-input').value = '';
}
