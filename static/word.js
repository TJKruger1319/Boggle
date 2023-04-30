const $guessForm = $("#guess-form");
const $guess = $("#guess");
const BASE_URL = "http://127.0.0.1:5000";

async function getFromServer(){
    let test = await axios.get(`${BASE_URL}/guess`);
    console.log(test.data.result);
    $('#result').text(test.data.result)
}

async function sendToServer(value){
    return await axios.post(`${BASE_URL}/getguess`, {
        value: value
    })
}

$guessForm.on("submit", function(e) {
    e.preventDefault();
    let value = $("#guess").val();
    console.log(value);
    sendToServer(value);
    getFromServer();
});

