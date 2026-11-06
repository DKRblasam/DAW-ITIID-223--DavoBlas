export default function StudentForm() {
  return (
    <form>
      <label htmlFor="name">Escribe tu nombre</label>
      <input type="text" placeholder="David ..." id="name" />
      <label htmlFor="career">Escribe tu carrera</label>
      <input type="text" placeholder="ITIID" id="career" />
      <button type="submit">Agregar</button>
    </form>
  );
}
