import { useState } from 'react'
import { destinos } from './data/destinos'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ContadorFavoritos from './components/ContadorFavoritos'
import Buscador from './components/Buscador'
import DestinoCard from './components/DestinoCard'

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [favoritos, setFavoritos] = useState([]) // ids de los destinos favoritos
  const [soloFavoritos, setSoloFavoritos] = useState(false)

  // b. Marcar / desmarcar favorito
  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  // a. Filtrar por texto (nombre, país o categoría) y, opcionalmente, solo favoritos
  const texto = busqueda.trim().toLowerCase()
  const destinosFiltrados = destinos.filter((d) => {
    const coincide =
      d.nombre.toLowerCase().includes(texto) ||
      d.ubicacion.toLowerCase().includes(texto) ||
      d.categoria.toLowerCase().includes(texto)
    return coincide && (!soloFavoritos || favoritos.includes(d.id))
  })

  return (
    <>
      <Navbar />
      <main className="contenedor">
        <Hero />
        {/* d. Contador de favoritos */}
        <ContadorFavoritos total={favoritos.length} />

        <section id="destinos">
          <h2>Explora destinos turísticos</h2>
          <Buscador valor={busqueda} onCambio={setBusqueda} />
          <button
            className="btn btn--primario btn--filtro"
            onClick={() => setSoloFavoritos(!soloFavoritos)}
          >
            {soloFavoritos ? 'Mostrar todos' : 'Mostrar favoritos'}
          </button>

          {destinosFiltrados.length > 0 ? (
            <div className="grid">
              {destinosFiltrados.map((destino) => (
                <DestinoCard
                  key={destino.id}
                  destino={destino}
                  esFavorito={favoritos.includes(destino.id)}
                  onToggleFavorito={toggleFavorito}
                />
              ))}
            </div>
          ) : (
            <p className="vacio">
              {soloFavoritos && favoritos.length === 0
                ? 'Aún no tienes favoritos. Marca un destino con el corazón.'
                : 'No se encontraron destinos con esa búsqueda.'}
            </p>
          )}
        </section>
      </main>
    </>
  )
}

export default App
