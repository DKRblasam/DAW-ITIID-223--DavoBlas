from flask import Blueprint

cStudentBP = Blueprint("controladorAlumno", __name__)


@cStudentBP.route("/")
def inicio():
    return "<h1 style='font-size: 20px; color: green;'>Hi, esto es el backend de alumno</h1>"


## Ruta de guardado.
@cStudentBP.route("/guardar", methods=["POST"])
def guardarStd():
    return "Se guardo correctamente el alumno"


## Ruta de consulta
@cStudentBP.route("/checkall")
def checkall():
    return "Se consulto todo, con el poder de la imaginacion"


## Ruta de actualizar a un alumno
@cStudentBP.route("/updAlumno", methods=["PUT"])
def updAlumno():
    return "Se actualizo el alumno"


## Ruta para eliminar al alumno
@cStudentBP.route("/elmAlumno", methods=["DELETE"])
def elmAlumno():
    return "Se a borrado el alumno exitosamente"
