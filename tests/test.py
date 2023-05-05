from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def test_post(self):
        with app.test_client() as client:
            client.get("/")
            resp = client.post("/guess", data={"value": "c"})
            var = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(var, "not-on-board" or "ok")

    def test_extra_word(self):
        with app.test_client() as client:
             with client.session_transaction() as change_session:
                client.get("/")
                change_session['guesses'] = ["c"]      
                resp = client.post("/guess", data={"value": "c"})
                var = resp.get_data(as_text=True)

                self.assertEqual(resp.status_code, 200)
                self.assertEqual(var, "already-guessed")
