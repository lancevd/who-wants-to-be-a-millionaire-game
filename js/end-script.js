let username = document.getElementById('username')
let saveButton = document.getElementById('save');
const recentScore = localStorage.getItem('lastScore');
let overAllScore = document.getElementById('total-score');
overAllScore.innerHTML = recentScore;
const scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];

function goHome () {
    window.location.assign('/index.html');
}
function goGame () {
    window.location.assign('/game.html');
}



saveScore = e =>{
    
    const score = {
        name: username.value,
        score: recentScore
    };

    e.preventDefault();
    console.log(score);
    scoreList.push(score);
    if (scoreList.length >= 4){
    scoreList.splice(0, 1);
    };
    localStorage.setItem('scoreList', JSON.stringify(scoreList));
    window.location.assign('index.html');
}

function noUsername () {
    if (!username.value) {
        alert('Please enter username');
        window.location.assign('end.html');
    };

};
saveButton.addEventListener('click', saveScore);
saveButton.addEventListener('click', noUsername);

