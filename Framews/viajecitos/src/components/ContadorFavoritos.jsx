// Recibe la cantidad de favoritos por props (d. Contador)
function ContadorFavoritos({ total }) {
  return (
    <section className="contador">
      <div>
        <h3>Destinos favoritos</h3>
        <p>
          {total === 0
            ? 'Tu próxima aventura comienza aquí.'
            : total === 1
              ? 'Tienes 1 destino guardado.'
              : `Tienes ${total} destinos guardados.`}
        </p>
      </div>
      <span className="contador__numero">{total}</span>
    </section>
  )
}

export default ContadorFavoritos
