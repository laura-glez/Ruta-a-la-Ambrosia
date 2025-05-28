
async function obtenerReservas(idUsuario) {
    try {
      const res = await fetch(`http://localhost:9003/reserva/usuarioId/${idUsuario}`);
      const reservas = await res.json();
      
      if (!reservas || reservas.length === 0) {
        document.getElementById('tablaReservasContainer').innerHTML = `<p>No se encontraron reservas</p>`;
        return;
      }
  
      renderizarTablaReservas(reservas);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      document.getElementById('tablaReservasContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}


function renderizarTablaReservas(reservas) {
    const tablaContainer = document.getElementById('tablaReservasContainer');
  
    const filas = reservas.map((reserva, index) => `
      <tr>
        <td>${reserva.idReserva || "N/A"}</td>
        <td>${reserva.idEvento || "Sin evento"}</td>
        <td>${reserva.nombreEvento || "Sin evento"}</td>
        <td>${reserva.precioVenta ?? "No especificado"}</td>
        <td>${reserva.precioEvento ?? "No especificado"}</td>
        <td>
            <input type="number" value="${reserva.cantidad ?? 1}" class="cantidadInput" data-idReserva="${reserva.idReserva}" min="1" max="10" />
        </td>
        <td>
            <button class="guardarCantidadBtn" data-idReserva="${reserva.idReserva}">Guardar</button>
        </td>
        <td>
            <button class="eliminarReservaBtn" data-idReserva="${reserva.idReserva}">Cancelar Reserva</button>
        </td>
      </tr>
    `).join('');
  
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
            <th>Modificar</th>
            <th>Cancela tu Reserva</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    `;


    const guardarBtns = document.querySelectorAll('.guardarCantidadBtn');
    guardarBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const idReserva = this.getAttribute('data-idReserva');
            const cantidadInput = this.closest('tr').querySelector('.cantidadInput');
            const nuevaCantidad = cantidadInput.value;
            guardarCantidadModificada(idReserva, nuevaCantidad); 
        });
    });

  
    const eliminarBtns = document.querySelectorAll('.eliminarReservaBtn');
    eliminarBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const idReserva = this.getAttribute('data-idReserva');
            eliminarReserva(idReserva);  
        });
    });
}
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

  async function guardarCantidadModificada(idReserva, nuevaCantidad) {
    let eventos = []; // Esto no parece ser necesario, ¿seguro que lo necesitas?

    // Obtener datos adicionales de la reserva (por ejemplo, precioVenta y observaciones)
    const fila = document.querySelector(`[data-idReserva="${idReserva}"]`).closest('tr');
    const precioVenta = fila.querySelector('.precioVenta').textContent;  // Suponiendo que tienes esa columna
    const observaciones = fila.querySelector('.observaciones').textContent;  // Lo mismo para observaciones (si existe)

    const reservaModificada = {
        idReserva,
        cantidad: nuevaCantidad,
        precioVenta, // Asegúrate de tener este dato correctamente
        observaciones, // Si tienes observaciones
        usuario: { idUsuario: idUsuario }
    };

    console.log(reservaModificada);  // Esto muestra los datos que se enviarán

    try {
        const response = await fetch('http://localhost:9003/reserva/modificar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservaModificada),
        });

        if (response.ok) {
            alert("Reserva modificada con éxito");
            obtenerReservas(idUsuario); // Re-renderizar las reservas después de la modificación
        } else {
            throw new Error('Error al modificar la reserva');
        }
    } catch (error) {
        console.error('Error al modificar la reserva:', error);
        alert('Hubo un problema al modificar la reserva.');
    }
}


async function eliminarReserva(idReserva) {
    const confirmDelete = confirm("¿Estás seguro de eliminar esta reserva?");
    
    if (confirmDelete) {
        try {
            
            const response = await fetch(`http://localhost:9003/reserva/eliminar/${idReserva}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Reserva cancelada con éxito");
                obtenerReservas(idUsuario); 
            } else {
                throw new Error('No se pudo cancelar la reserva');
            }
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            alert('Hubo un problema al cancelar la reserva.');
        }
    }
}


const idUsuario = JSON.parse(localStorage.getItem('usuario')).idUsuario;
obtenerReservas(idUsuario);

// Función para cerrar sesión
const cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "prueba.html";
});
