const $guessForm = $("#guess-form");
const $guess = $("#guess");
const BASE_URL = "http://127.0.0.1:5000";
let score;
if (localStorage.length > 0) {
    score = Number(localStorage.getItem("score"));
} else {
    score = 0;
}

function sendToServer(){
    axios.post('${BASE_URL}/guess', $guess);
}

function displayScore(){
    result = $("#result").text();
    console.log(result);
    if (result === "ok") {
        score += $guess.length;
        console.log($guess.length)
        localStorage.setItem("score", score)
        console.log(score)
    }
    $("#score").text(score);
}

$guessForm.on("submit", function() {
    sendToServer();
});

displayScore();