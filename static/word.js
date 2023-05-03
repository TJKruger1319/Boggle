const $guessForm = $("#guess-form");
const $board = $('#board');
const $guess = $("#guess");
const $start = $(".start");
const $startSection = $("#start-section");
const $resultSection = $("#result-section");
const $finalSection = $("#final-section")
const BASE_URL = "http://127.0.0.1:5000";
let score = 0;
let highestScore = 0;
let timesPlayed = 0;

async function getFromServer(value){
    //Gets the result from the backend
    test = await axios.post(`${BASE_URL}/guess`, {
        value: value
    })
    result = test.data.result
    console.log(`and the result of that is ${result}`);
    //Put the result on the ui
    $('#result').text(result);
    scoreBoard(result, value)
}

function scoreBoard(result, value){
    //Determines if the word is in the boggle, and then updates the score if it is
    if (result === "ok") {
        score += value.length;
        $('#score').text(`Score: ${score}`)
    }
}

function statistics() {
    //Shows your final score, your highest score, and the amount of times you played
    if (score >= highestScore) {
        highestScore = score;
    }
    timesPlayed++;
    $('#final-score').text(`Final score: ${score}`)
    $('#high-score').text(`Your highest score: ${highestScore}`)
    $('#times-played').text(`Times played: ${timesPlayed}`)
}

function startGame() {
    //Resets base values if game is being replayed
    score = 0;
    $('#result').text('');
    $('#score').text(`Score: 0`)

    //Shows the game board
    $startSection.hide();
    $board.show();
    $guessForm.show();
    $resultSection.show();

    //Minute timer for when game ends
    setTimeout(endGame, 60000);
}

function endGame() {
    //Removes the game board
    $board.hide();
    $guessForm.hide();
    $resultSection.hide();
    $finalSection.show();

    //Shows the final statistics
    statistics();
}

$start.on("click", function(){
    $finalSection.hide();
    startGame();
})

$guessForm.on("submit", function(e) {
    e.preventDefault();
    let value = $("#guess").val();
    console.log(`The word entered was: ${value}`);
    getFromServer(value);
    $guessForm.trigger("reset");
});

