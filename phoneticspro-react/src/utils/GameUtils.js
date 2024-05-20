/*export async function getWords() {
    let term = [];
    let transcription = [];
    await fetch('http://localhost:8094/api/Word/list')
      .then(response => response.json())
      .then(data => {
        data.forEach(palabra => {
          const word = { 'term': palabra.term, 'transcription': palabra.transcription };
          term.push(word.term);
          transcription.push(word.transcription);
        });
      })
      .catch(error => {
        console.error('Error al cargar las palabras', error);
        alert('Ha ocurrido un error, intente más tarde');
      });
    return [term, transcription];
  }
  
  export function getDate_attempt() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  export function formatTime(timeInSeconds) {
    var hours = Math.floor(timeInSeconds / 3600);
    var minutes = Math.floor((timeInSeconds % 3600) / 60);
    var seconds = Math.floor(timeInSeconds % 60);
    return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }*/