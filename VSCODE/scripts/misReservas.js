// Función para obtener las reservas del usuario desde el backend
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
      </tr>
    `).join('');
  
    // Insertar la tabla en el contenedor
    tablaContainer.innerHTML = `
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
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    `;
  }
  
  const idUsuario = 2; 
  obtenerReservas(idUsuario);
  