const $guessForm = $("#guess-form");
const $guess = $("#guess");
const BASE_URL = "http://127.0.0.1:5000";
let score = 0;

async function getFromServer(value){
    //Gets the result from the backend
    let test = await axios.get(`${BASE_URL}/guess`);
    result = test.data.result
    console.log(result);
    displayResult(result);
    scoreBoard(result, value)
}

async function sendToServer(value){
    //Sends the guess to the backend
    return await axios.post(`${BASE_URL}/getguess`, {
        value: value
    })
}

function displayResult(result) {
    //Put the result on the ui
    $('#result').text(result);
}

function scoreBoard(result, value){
    //Determines if the word is in the boggle, and then updates the score if it is
    if (result === "ok") {
        score += value.length;
        $('#score').text(`Score: ${score}`)
    }
}

$guessForm.on("submit", function(e) {
    e.preventDefault();
    let value = $("#guess").val();
    console.log(value);
    sendToServer(value);
    getFromServer(value);
});

