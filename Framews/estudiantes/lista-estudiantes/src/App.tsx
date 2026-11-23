import Estudiante from "./Components/common/Estudiante.jsx";

export default function App() {
  const Students = [
    {
      id: 1,
      name: "Ivan",
      carrer: "Tecnologías",
    },
    {
      id: 2,
      name: "Leo",
      carrer: "Comericio",
    },
    {
      id: 3,
      name: "David",
      carrer: "Ingenieria",
    },
  ];

  return (
    <>
      <main className="contenedor">
        <h1>Lista de estudiantes</h1>

        <div>
          <form action="">
            <label htmlFor="name">Escribe tu nombre</label> <br />
            <input type="text" placeholder="David ..." id="name" /> <br />
            <label htmlFor="carrer">Escribe tu carrera</label> <br />
            <input type="text" placeholder="ITIID" id="carrer" />
            <br />
            <button type="submit"> Agregar </button>
          </form>

          <h2>Estuduantes Registrados</h2>

          <ul>
            {Students.map((student) => (
              <Estudiante key={student.id} student={student} />
            ))}
          </ul>
          <p>
            <strong>Total de estudiantes: </strong> {Students.length}
          </p>
        </div>
      </main>
    </>
  );
}
