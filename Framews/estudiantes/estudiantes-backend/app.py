from flask import Flask

app = Flask(__name__)


@app.route("/")
def inicio():
    return "Hello wolrd from flask"


@app.route("/other", method=["POST"])
def otra():
    return "Yo soy otra ruta flask"


if __name__ == "__main__":
    app.run(debug=True)
