package eventosweb.modelo.dto;

import java.io.Serializable;
import java.util.List;

import eventosweb.modelo.entities.Usuario;

public class UsuarioDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer idUsuario;
	private String email;
	
	public UsuarioDto() {
		super();
	}
	
	public UsuarioDto(Integer idUsuario, String email) {
		super();
		this.idUsuario = idUsuario;
		this.email = email;
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

	public static UsuarioDto convert (Usuario user) {
		UsuarioDto ususario = new UsuarioDto();
		
		ususario.setIdUsuario(user.getIdUsuario());
		ususario.setEmail(user.getEmail());
		
		return ususario;
	}
	
	public static List<UsuarioDto> converList (List<Usuario> usuarios){
		return usuarios.stream()
				.map(ele -> UsuarioDto.convert(ele))
				.toList();
	}
	
	
}
