package eventosweb.modelo.dto;

import java.util.List;

import eventosweb.modelo.entities.Usuario;

public class UsuarioDtoDatos {
	
	private Integer idUsuario;
	private String email;
	private String nombre;
	private String apellidos;
	
	public UsuarioDtoDatos(Integer idUsuario, String email, String nombre, String apellido) {
		super();
		this.idUsuario = idUsuario;
		this.email = email;
		this.nombre = nombre;
		this.apellidos = apellidos;
	}
	public UsuarioDtoDatos() {
		super();
	}
	public Integer getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	
	public static UsuarioDtoDatos convert (Usuario user) {
		UsuarioDtoDatos usuario = new UsuarioDtoDatos();
		
		usuario.setIdUsuario(user.getIdUsuario());
		usuario.setEmail(user.getEmail());
		usuario.setNombre(user.getNombre());
		usuario.setApellidos(user.getApellidos());
		
		return usuario;
	}
	
	public static List<UsuarioDtoDatos> converList (List<Usuario> usuarios){
		return usuarios.stream()
				.map(ele -> UsuarioDtoDatos.convert(ele))
				.toList();
	}
}
