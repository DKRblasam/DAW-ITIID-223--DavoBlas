function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__contenido">
        <a className="navbar__marca" href="#inicio">
          <span aria-hidden="true">✈</span> TravelApp
        </a>
        <nav className="navbar__links">
          <a href="#inicio">Inicio</a>
          <a href="#destinos">Destinos</a>
          <a href="#destinos">Favoritos</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
