const scoresRecent = document.getElementById('scores-list');
const scores = JSON.parse(localStorage.getItem('scoreList')) || [];
let scoreArray = Array.from(scores);
scoresRecent.innerHTML = scoreArray
console.log(scoreArray
.map(
    score => {
        return `<li class = "recentScore"> ${score.name}: ${score.score}</li>`;
    }).join('')
);

