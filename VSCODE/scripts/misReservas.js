async function obtenerReservas(idUsuario) {
    try {
      const res = await fetch(`http://localhost:9003/reserva/usuarioId/${idUsuario}`);
      const reservas = await res.json();
      
      // Si no se encuentran reservas, mostramos un mensaje
      if (!reservas || reservas.length === 0) {
        document.getElementById('tablaReservasContainer').innerHTML = `<p>No se encontraron reservas</p>`;
        return;
      }
  
      // Si se encontraron reservas, renderizamos la tabla
      renderizarTablaReservas(reservas);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      document.getElementById('tablaReservasContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
    }
  }
  
  // Función para renderizar la tabla con los datos de las reservas
  function renderizarTablaReservas(reservas) {
    // Obtener el contenedor donde se va a insertar la tabla
    const tablaContainer = document.getElementById('tablaReservasContainer');
  
    // Crear las filas de la tabla dinámicamente
    const filas = reservas.map(reserva => `
  <tr>
    <td>${reserva.idReserva || "N/A"}</td>
    <td>${reserva.idEvento || "Sin evento"}</td>
    <td>${reserva.nombreEvento || "Sin evento"}</td>
    <td>${reserva.precioVenta ?? "No especificado"}</td>
    <td>${reserva.precioEvento ?? "No especificado"}</td>
    <td>${reserva.cantidad ?? "No especificada"}</td>
    <td>
        <img src="https://img.icons8.com/?size=100&id=uFiFoKw72geP&format=png&color=000000" alt="icono" width="30" height="30" />
      </a>
    </td>
  </tr>
  `).join('');
  
    // Insertar la tabla en el contenedor
    tablaContainer.innerHTML =  `
      <br><br>
      <table id="tablaReservas" border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Evento ID</th>
            <th>Nombre Evento</th>
            <th>Precio Evento</th>
            <th>Precio Venta</th>
            <th>Cantidad</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
      `;
  };
  
  async function getUsuario(idUsuario) {
    try {
        const res = await fetch(`http://localhost:9003/usuario/buscarDatosUsuario/${idUsuario}`);
        if (!res.ok) {
            throw new Error(`Error al obtener el usuario: ${res.statusText}`);
        }
        const user = await res.json();
        return user;
    } catch (error) {
        document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
        throw error; 
    }
}
  async function renderizarNombreUsuario() {
    try {
        const usuario = await getUsuario(idUsuario); 
        const divNombre = document.getElementById('nombreUsuario');
        divNombre.innerHTML = `
            <nav class="nav nav1">
                <li><a href="#"> ${usuario.nombre}</a></li>
            </nav>
        `;
    } catch (error) {
        console.error("Error al renderizar el nombre del usuario:", error);
    }
}
  const idUsuario = JSON.parse(localStorage.getItem('usuario')).idUsuario;
  obtenerReservas(idUsuario);
  renderizarNombreUsuario();

  //LIMPIAR EL LOCALSTORAG AL SALIR
  const cerrarSesion = document.getElementById('cerrarSesion');
  cerrarSesion.addEventListener('click', function(e){
    e.preventDefault();
    localStorage.clear();
    window.location.href= "prueba.html";
  });