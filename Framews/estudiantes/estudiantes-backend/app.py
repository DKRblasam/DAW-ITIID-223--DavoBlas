from logging import debug

from Controllers.controllerStudent import cStudentBP
from flask import Flask


def createApp():
    app = Flask(__name__)
    app.register_blueprint(cStudentBP)
    return app


if __name__ == "__main__":
    app = createApp()
    app.run(port=4321, debug=True)
