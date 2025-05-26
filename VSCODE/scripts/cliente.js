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



        async function getUsuario(idUsuario) {
            try {
                
                const resUsuario = await fetch(`http://localhost:9003/reserva/usuarioId/${idUsuario}`);
                const usuario = await resUsuario.json();

                if (!usuario) {
                    document.getElementById('tablaUsuarioContainer').innerHTML = `<p>No se encontraron datos para el usuario.</p>`;
                    return;
                }

               
                renderizarTablaUsuario([usuario]);  
            } catch (error) {
                console.error(error);
                document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
            }
        }

        function renderizarTablaUsuario(usuarios) {
            const tablaContainer = document.getElementById('tablaUsuarioContainer');
            
          
            const filas = usuarios.map(usuario => `
            <br>
            <br>
            <br>
                <h2>Detalles del Usuario: ${usuario.nombre}</h2>
                <p><strong>ID:</strong> ${usuario.idUsuario}</p>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p><strong>Apellidos:</strong> ${usuario.apellidos}</p>
                <p><strong>Password:</strong> <input type="password" value="${usuario.password}" disabled /></p>
            `).join('');

            
            tablaContainer.innerHTML = filas;
        }

      const idUsuario = JSON.parse(localStorage.getItem('usuario')).idUsuario;
        getUsuario(idUsuario);

        //LIMPIAR EL LOCALSTORAG AL SALIR
    const cerrarSesion = document.getElementById('cerrarSesion');
    cerrarSesion.addEventListener('click', function(e){
      e.preventDefault();
      localStorage.clear();
      window.location.href= "prueba.html";
    });