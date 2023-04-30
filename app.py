from flask import Flask, session, render_template, jsonify, redirect, request, flash
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'An open book'

new_boggle = Boggle()
board = new_boggle.make_board()

print(board)

@app.route("/")
def start_game():
    session["board"] = board
    return render_template("board.html", board=board)


@app.route("/guess", methods=['GET','POST'])
def is_word():
    session["result"] = ""
    board = session["board"]
    word = session['word']
    print(word, "24")
    answer = new_boggle.check_valid_word(board, word)
    dict = {"result": answer}
    session["result"] = dict
    result = jsonify(dict)
    print(result)
    return result


@app.route("/getguess", methods=['POST'])
def get_guess():
    word = request.form.get('boggle-guess')
    session['word'] = word
    print(word, "36")
    return "Success"