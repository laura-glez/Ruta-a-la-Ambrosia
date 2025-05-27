
 // Función para obtener los datos desde localStorage
 const getData = () => JSON.parse(localStorage.getItem('user') || '[]');
 
 const login = document.getElementById('login-popup');
 // Cuando se envía el del registro del cliente
 login.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que recargue la página    
    

    try {
        const res = await fetch(`http://localhost:9003/usuario/buscarEmailYPass/${document.getElementById('usuario').value}/${document.getElementById('contrasena').value}`, {
            method: "GET",
        });
        
        const listResult = await res.json();
        console.log(listResult);
        
        const user = listResult;
        if(user.idUsuario === 1){
            console.log('if = 1')
            //localStorage.setItem(user);
            localStorage.setItem('usuario', JSON.stringify(user));
            window.location.href = 'eventos.html';
            //login.reset();
        }else{
            console.log('if != 1')
            //localStorage.setItem(user);
            localStorage.setItem('usuario', JSON.stringify(user));
            window.location.href = 'loginCliente.html';
            login.reset();}
        }
                
        catch (error) {
            //console.error('Error al hacer la solicitud:', error);
        }
        
    });


//POPUP LOGIN
const container = document.querySelector(".container");
        Array.from(container.querySelectorAll(".card")).forEach(card => {
            card.addEventListener("click", (e) => {  
                const clone = card.cloneNode(true);
                card.classList.toggle("flat");
                const closeButton = document.createElement("button");
                closeButton.classList.add("close-button");
                closeButton.innerHTML = "&times;";
                clone.appendChild(closeButton);
                clone.style.position = "fixed";
                clone.style.left = card.getBoundingClientRect().left + "px";
                clone.style.top = card.getBoundingClientRect().top + "px";
                clone.style.width = card.offsetWidth + "px";
                clone.style.height = card.offsetHeight + "px";
                clone.style.zIndex = 999;
      
                // Mostrar los detalles al expandir
                const details = clone.querySelector(".card-details");
                if (details) {
                    details.style.display = "block";
                }
      
                document.body.appendChild(clone);
                requestAnimationFrame(() => clone.classList.add("card-full"));
      
                closeButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    clone.classList.remove("card-full");
                    card.classList.toggle("flat");
                    setTimeout(() => clone.remove(), 300);
                });
      
                clone.addEventListener("click", e => {
                    clone.classList.remove("card-full");
                    card.classList.toggle("flat");
                    setTimeout(() => clone.remove(), 300);
                });
            });
        });

// const enlace = document.querySelector('enlaceGirar');
// const logIn = document.getElementById('login-popup');
// const singIn = document.getElementById('login-popup2');

// Función que se ejecuta al hacer clic en el enlace
// enlace.addEventListener('click', (event) => {
//     event.preventDefault(); // Prevenir la acción por defecto del enlace
    
//     // Alternar entre los formularios
//     logIn.classList.toggle('oculto');  // Oculta o muestra el formulario 1
//     singIn.classList.toggle('oculto');  // Oculta o muestra el formulario 2

//     // Cambiar el texto del enlace según el formulario visible
//     if (logIn.classList.contains('oculto')) {
//         logIn.style.display='none';
//         singIn.style.display = 'block';
//     } else {
//         singIn.style.display='none';
//         logIn.style.display = 'block';
//     }
// });