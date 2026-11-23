import { useState } from 'react'

// Tarjeta reutilizable: recibe los datos y los manejadores por props.
// El estado de "detalles" es local de cada tarjeta (c. Botón de detalles).
function DestinoCard({ destino, esFavorito, onToggleFavorito }) {
  const [mostrarDetalles, setMostrarDetalles] = useState(false)
  const [errorImagen, setErrorImagen] = useState(false)

  const precio = destino.precio.toLocaleString('es-MX')

  return (
    <article className="card">
      {errorImagen ? (
        <div className="card__img card__img--vacia" aria-hidden="true">
          ✈
        </div>
      ) : (
        <img
          className="card__img"
          src={destino.imagen}
          alt={`Vista de ${destino.nombre}`}
          onError={() => setErrorImagen(true)}
        />
      )}

      <div className="card__cuerpo">
        <span className="card__etiqueta">{destino.categoria}</span>
        <h3>{destino.nombre}</h3>
        <p className="card__ubicacion">
          <span aria-hidden="true">📍</span> {destino.ubicacion}
        </p>
        <p className="card__precio">Desde ${precio} MXN</p>

        {mostrarDetalles && (
          <p className="card__descripcion">{destino.descripcion}</p>
        )}

        <div className="card__acciones">
          <button
            className={`btn btn--claro ${esFavorito ? 'btn--activo' : ''}`}
            onClick={() => onToggleFavorito(destino.id)}
            aria-pressed={esFavorito}
          >
            {esFavorito ? '♥ Quitar favorito' : '♡ Agregar favorito'}
          </button>
          <button
            className="btn btn--primario"
            onClick={() => setMostrarDetalles(!mostrarDetalles)}
            aria-expanded={mostrarDetalles}
          >
            {mostrarDetalles ? 'Ocultar detalles' : 'Ver detalles'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default DestinoCard
