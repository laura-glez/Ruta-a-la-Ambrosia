package eventosweb.modelo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import eventosweb.modelo.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	public List<Usuario> findByNombreContaining(String cadena);
	public Usuario findByEmailAndPassword(String email, String password);	
	public List<Usuario> findByEmail (String email);
}
