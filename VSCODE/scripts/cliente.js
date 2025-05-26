document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const clone = card.cloneNode(true);
      card.classList.toggle("flat");

      clone.querySelectorAll('.btn-P-Reseñas').forEach(btn => {
        btn.style.position   = 'absolute';
        btn.style.bottom     = '1.5rem';
        btn.style.left       = '50%';
        btn.style.transform  = 'translateX(-50%)';
        btn.style.margin     = '0';
      });

      const closeButton = document.createElement("button");
      closeButton.classList.add("close-button");
      closeButton.innerHTML = "&times;";
      clone.appendChild(closeButton);

      clone.querySelectorAll('.btn-P-Reseñas').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation(); 
          const destino = btn.getAttribute('dirreccion-para-reservas');
          if (destino) window.location.href = destino;
        });
      });
      clone.style.position = "fixed";
      clone.style.left     = card.getBoundingClientRect().left + "px";
      clone.style.top      = card.getBoundingClientRect().top + "px";
      clone.style.width    = card.offsetWidth + "px";
      clone.style.height   = card.offsetHeight + "px";
      clone.style.zIndex   = 999;
      clone.querySelector(".card-details").style.display = "block";

      document.body.appendChild(clone);
      requestAnimationFrame(() => clone.classList.add("card-full"));

      closeButton.addEventListener("click", e => {
        e.stopPropagation();
        clone.classList.remove("card-full");
        card.classList.toggle("flat");
        setTimeout(() => clone.remove(), 300);
      });

      clone.addEventListener("click", e => {
        if (e.target === clone) {
          clone.classList.remove("card-full");
          card.classList.toggle("flat");
          setTimeout(() => clone.remove(), 300);
        }
      });
    });
  });


const idUsuario = 2; 
async function getUsuario(idUsuario) {
  try {
    
    const resUsuario = await fetch(`localhost:9003/reserva/usuarioId/${idUsuario}`);
    const usuario = await resUsuario.json();
    
    if (!usuario) {
      document.getElementById('tablaBody').innerHTML = `<tr><td colspan="5">No se encontraron datos para el usuario.</td></tr>`;
      return;
    }

    
    renderTablaUsuario(usuario);
  } catch (error) {
    console.error(error);
    document.getElementById('tablaBody').innerHTML = `<tr><td colspan="5" style="color:red">${error.message}</td></tr>`;
  }
}


function renderTablaUsuario(usuario) {
  const tablaBody = document.getElementById('tablaBody');
  tablaBody.innerHTML = ""; 

  // Crear la fila con los datos del usuario
  const fila = tablaBody.insertRow();

  // Celda de Id Usuario
  const celdaId = fila.insertCell();
  celdaId.textContent = usuario.idUsuario;

  // Celda de Email
  const celdaEmail = fila.insertCell();
  celdaEmail.textContent = usuario.email;

  // Celda de Nombre
  const celdaNombre = fila.insertCell();
  celdaNombre.textContent = usuario.nombre;

  // Celda de Apellidos
  const celdaApellidos = fila.insertCell();
  celdaApellidos.textContent = usuario.apellidos;

  // Celda de Password (input tipo password)
  const celdaPassword = fila.insertCell();
  const inputPassword = document.createElement("input");
  inputPassword.type = "password";  // Mostrar como password (asteriscos)
  inputPassword.value = usuario.password;  
  inputPassword.disabled = true; 
  celdaPassword.appendChild(inputPassword);
}


getUsuario(idUsuario);
