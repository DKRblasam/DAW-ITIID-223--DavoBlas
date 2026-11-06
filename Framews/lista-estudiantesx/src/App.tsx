import StudentForm from "@/components/StudentForm";
import StudentItem from "@/components/StudentItem";
import { STUDENTS } from "@/constants/students";

export default function App() {
  return (
    <main className="contenedor">
      <h1>Lista de estudiantes</h1>

      <StudentForm />

      <h2>Estudiantes Registrados</h2>

      {/* role="list" conserva la semántica de lista en lectores de pantalla aunque el CSS quite los estilos de lista */}
      <ul role="list">
        {STUDENTS.map((student) => (
          <StudentItem key={student.id} student={student} />
        ))}
      </ul>

      <p>
        <strong>Total de estudiantes: </strong> {STUDENTS.length}
      </p>
    </main>
  );
}
