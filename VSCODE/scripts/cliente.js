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


  const idUsuario = JSON.parse(localStorage.getItem('usuario')).idUsuario;
  console.log(idUsuario);
  

        async function getReservasUsuario(idUsuario) {
            try {
                
                const resUsuario = await fetch(`http://localhost:9003/reserva/usuarioId/${idUsuario}`);
                const usuarios = await resUsuario.json();
                console.log(usuarios);

                if (!usuarios) {
                    document.getElementById('tablaUsuarioContainer').innerHTML = `<p>No se encontraron datos para el usuario.</p>`;
                    return;
                }

               
                  
            } catch (error) {
                //console.error(error);
                document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
            }
        }

        function renderizarTablaUsuario(u) {
            //const tablaContainer = document.getElementById('tablaUsuarioContainer');
            const divDetalles = document.getElementById('tablaUsuarioContainer');
            u = getUsuario(idUsuario);
            console.log(u);
            divDetalles.innerHTML =`
            <br>
            <br>
            <br>
                <h2>Detalles del Usuario: ${u.nombre}</h2>
                <p><strong>ID:</strong> ${u.idUsuario}</p>
                <p><strong>Email:</strong> ${u.email}</p>
                <p><strong>Nombre:</strong> ${u.nombre}</p>
                <p><strong>Apellidos:</strong> ${u.apellidos}</p>
                <p><strong>Password:</strong> <input type="password" value="${u.password}" disabled /></p>
            `;
        }

      const usuario = getUsuario(idUsuario);
      renderizarTablaUsuario(usuario);

        //LIMPIAR EL LOCALSTORAG AL SALIR
    const cerrarSesion = document.getElementById('cerrarSesion');
    cerrarSesion.addEventListener('click', function(e){
      e.preventDefault();
      localStorage.clear();
      window.location.href= "prueba.html";
    });