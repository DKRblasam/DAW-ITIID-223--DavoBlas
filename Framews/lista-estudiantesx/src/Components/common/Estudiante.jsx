export default function Estudiante({student}) {
  return (
    <>
      <li>
        <strong>{student.name}</strong> {"--"}{student.carrer}
        <button type="button">Eliminar</button>
      </li>
    </>
  );
}
