const correctPositionPattern = [
  "a", "d", "c", "b", "b", "c", "c", "a", "d",
  "d", "a", "b", "c", "c", "b", "a", "d",
  "a", "b", "c", "d", "d", "a", "d", "b",
  "c", "c", "d", "a", "b", "c", "a", "d",
  "b", "b", "a", "c", "a", "d", "b"
];
 
let patternIndex = 0;
 
 
function shuffleCorrectAnswers(questions) {
 
  return questions.map(question => {
 
    // aktuelle richtige Antwort holen
    const oldCorrectLetter = question.correct;
    const correctText = question.options[oldCorrectLetter];
 
 
    // gewünschte neue Position aus Muster holen
    const newCorrectLetter = correctPositionPattern[patternIndex % correctPositionPattern.length]
      .toUpperCase();
 
    patternIndex++;
 
 
    // alle Antworttexte sammeln
    const answers = Object.values(question.options);
 
 
    // richtige Antwort entfernen
    const wrongAnswers = answers.filter(answer => answer !== correctText);
 
 
    // neue Positionen vorbereiten
    const newOptions = {
      A: "",
      B: "",
      C: "",
      D: ""
    };
 
 
    // falsche Antworten verteilen
    let wrongIndex = 0;
 
    for (const letter of ["A", "B", "C", "D"]) {
 
      if (letter === newCorrectLetter) {
        newOptions[letter] = correctText;
      } else {
        newOptions[letter] = wrongAnswers[wrongIndex];
        wrongIndex++;
      }
    }
 
 
    return {
      ...question,
      options: newOptions,
      correct: newCorrectLetter
    };
 
  });
}
const fs = require("fs");

// deine Datei
const inputFile = "quiz.json";
const outputFile = "quiz_neu.json";


// JSON-Datei lesen
const jsonData = fs.readFileSync(inputFile, "utf8");

const fragen = JSON.parse(jsonData);


// Antworten neu sortieren
const neuesQuiz = shuffleCorrectAnswers(fragen);


// neue Datei speichern
fs.writeFileSync(
  outputFile,
  JSON.stringify(neuesQuiz, null, 2),
  "utf8"
);


console.log("Fertig! Datei erstellt:", outputFile);
 
 
// Beispiel:
// const neuesQuiz = shuffleCorrectAnswers(altesQuiz);
// console.log(JSON.stringify(neuesQuiz, null, 2));