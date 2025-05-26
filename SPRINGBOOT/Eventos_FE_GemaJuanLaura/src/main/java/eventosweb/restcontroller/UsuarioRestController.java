package eventosweb.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eventosweb.modelo.dao.UsuarioDao;
import eventosweb.modelo.dto.UsuarioDto;
import eventosweb.modelo.entities.Usuario;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuario")
public class UsuarioRestController {
	@Autowired
	private UsuarioDao udao;
	@GetMapping("/todos")
	public List<Usuario> todos(){
		return udao.todos();
	}
	
	@GetMapping("/nombre/{cadena}")
	public List<Usuario> subcadena(@PathVariable String cadena){
		return udao.porNombreContain(cadena);
	}

	@GetMapping("/uno/{idUsuario}")
	public Usuario uno(@PathVariable Integer idUsuario){
		return udao.buscarUno(idUsuario);
	}
	
	@PostMapping("/alta")
	public Usuario alta(@RequestBody Usuario usuario) {
	  return udao.insertOne(usuario);
	}
	
	 @DeleteMapping("/eliminar/{idUsuario}")
	 public Integer Eliminar (@PathVariable Integer idUsuario) {
		 return udao.eliminar(idUsuario);
	 }
	 
	 @PutMapping("/modificar")
		public Integer modificar(@RequestBody Usuario usuario) {
		 return udao.modificar(usuario);
		  
		}
	 
	 /*public List <ReservaDto> porEvento(@PathVariable int idEvento){
		return ReservaDto.converList(rdao.buscarPorEvento(idEvento));
		 
	 }*/
	 
//	 @GetMapping("/buscarEmail/{email}")
//	 public List<UsuarioDto> porEmail (PathVariable String email){
//		 return UsuarioDto.converList(null)
//	 }
	 
	 @GetMapping("/buscarEmailYPass/{email}/{pass}")
	 public Integer buscarPorEmailYPass (@PathVariable String email, @PathVariable String pass ) {
		 return udao.porEmailYPass(email, pass);
	 }
	 
}
