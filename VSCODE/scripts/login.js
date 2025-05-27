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
function mostarAlta(){
        const popup = document.getElementById('login-popup');
        const overlay = document.getElementById('popup-overlay');
        const form = document.getElementById('login-form');
        const formC = document.getElementById('login-form2');

        popup.classList.add('show');
        popup.style.display = 'block';
        overlay.style.display = 'block';
        form.style.display ='block';
        formC.style.display ='none'; 
    
      // Event listener para cerrar el modal
      document.getElementById('popup-close').addEventListener('click', () => {
        const popup = document.getElementById('login-popup');
        const overlay = document.getElementById('popup-overlay');

        popup.classList.remove('show');
        setTimeout(() => {
          popup.style.display = 'none';
          overlay.style.display = 'none';
        }, 200)
    });}

//POPUP SINGIN
function mostarRegistro(){
        const popup = document.getElementById('login-popup2');
        const overlay = document.getElementById('popup-overlay');
        const form = document.getElementById('login-form2');
        const formC = document.getElementById('login-form');

        popup.classList.add('show');
        popup.style.display = 'block';
        overlay.style.display = 'block';
        form.style.display ='block';
        formC.style.display ='none';    
    
      // Event listener para cerrar el modal
      document.getElementById('popup-close2').addEventListener('click', () => {
        const popup = document.getElementById('login-popup2');
        const overlay = document.getElementById('popup-overlay');

        popup.classList.remove('show');
        setTimeout(() => {
          popup.style.display = 'none';
          overlay.style.display = 'none';
          

        }, 200)
    });}

function mostrarRegistro(){
  // Oculta el formulario de login y muestra el de registro
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('login-form2').style.display = 'block';
}

function mostrarLogin(){
  // Oculta el formulario de registro y muestra el de login
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('login-form2').style.display = 'none';
}

function openLoginPopup(e) {
    e.preventDefault();
    mostarAlta();
}

