from flask import Flask, session, render_template, jsonify, request
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'An open book '

new_boggle = Boggle()
board = new_boggle.make_board()

print(board)

@app.route("/")
def start_game():
    session["guesses"] = []
    session["board"] = board
    return render_template("board.html", board=board)

@app.route("/guess", methods=['GET','POST'])
def is_word():
    board = session["board"]
    guesses = session["guesses"]
    word = request.json
    if word['value'] in guesses:
        return jsonify({"result": "already-guessed"})
    guesses.append(word['value'])
    session["guesses"] = guesses
    answer = new_boggle.check_valid_word(board, word['value'])
    return jsonify({"result": answer})


