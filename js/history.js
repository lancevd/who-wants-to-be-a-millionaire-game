const scoresRecent = document.getElementById("scores-list");
const scores = JSON.parse(localStorage.getItem("scoreList")) || [];

scoresRecent.innerHTML = scores
  .map(score => {
    return `<li class="score-class">${score.name}: ${score.score}</li>`;
  })
  .join("");

