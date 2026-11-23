// Input controlado: el valor vive en App y se actualiza con onChange (a. Buscador)
function Buscador({ valor, onCambio }) {
  return (
    <input
      type="text"
      className="buscador"
      placeholder="Buscar destino turístico..."
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
      aria-label="Buscar destino turístico"
    />
  )
}

export default Buscador
