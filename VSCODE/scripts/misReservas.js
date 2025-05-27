const idUsuario = JSON.parse(localStorage.getItem('usuario'))?.idUsuario; 
console.log(idUsuario);

async function getReservasUsuario(idUsuario) {
    try {
        const resUsuario = await fetch(`http://localhost:9003/reserva/usuarioId/${idUsuario}`);
        const usuarios = await resUsuario.json();
        console.log(usuarios);

        if (!usuarios || usuarios.length === 0) {
            document.getElementById('tablaUsuarioContainer').innerHTML = `<p>No se encontraron datos para el usuario.</p>`;
            return;
        }
    } catch (error) {
        document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}

async function getUsuario(idUsuario) {
    try {
        const res = await fetch(`http://localhost:9003/usuario/buscarDatosUsuario/${idUsuario}`);
        const usuario = await res.json();
        console.log(usuario);
        return usuario; 
    } catch (error) {
        document.getElementById('tablaUsuarioContainer').innerHTML = `<p style="color:red">${error.message}</p>`;
        throw error; 
    }
}

async function renderizarTablaUsuario(idUsuario) {
    const usuario = await getUsuario(idUsuario);
    const divDetalles = document.getElementById('tablaUsuarioContainer');
    divDetalles.innerHTML = `
        <br><br><br>
        <h2>Detalles del Usuario: ${usuario.nombre}</h2>
        <p><strong>ID:</strong> ${usuario.idUsuario}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Apellidos:</strong> ${usuario.apellidos}</p>
        <p><strong>Password:</strong> <input type="password" value="${usuario.password}" disabled /></p>
    `;
}

async function renderizarNombreUsuario(idUsuario) {
    const usuario = await getUsuario(idUsuario);
    const divNombre = document.getElementById('tablaUsuarioContainer');
    divNombre.innerHTML = `
        <nav class="nav nav1">
        <li><a href="#"> ${usuario.nombre}</a></li>
        </ul>`;
}

renderizarTablaUsuario(idUsuario);
renderizarNombreUsuario(idUsuario);
