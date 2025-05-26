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


import eventosweb.modelo.dao.ReservaDao;
import eventosweb.modelo.dto.ReservaDto;
import eventosweb.modelo.entities.Reserva;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reserva")
public class ReservaRestController {
	@Autowired
	private ReservaDao rdao;
	
	@GetMapping("/todos")
	public List<Reserva> todos(){
		return rdao.todos();
	}
	
	@GetMapping("/nombre/{cadena}")
	public List<Reserva> subcadena(@PathVariable String cadena){
		return null;
	}

	@GetMapping("/uno/{idReserva}")
	public Reserva uno(@PathVariable Integer idReserva){
		return rdao.buscarUno(idReserva);
	}
	
	@PostMapping("/alta")
	public Reserva alta(@RequestBody Reserva reserva) {
	  return rdao.insertOne(reserva);
	}
	
	 @DeleteMapping("/eliminar/{idReserva}")
	 public Integer Eliminar (@PathVariable int idReserva) {
		 return rdao.eliminar(idReserva);
	 }
	 
	 @PutMapping("/modificar")
		public Integer modificar(@RequestBody Reserva reserva) {
		 return rdao.modificar(reserva);
		  
		}
	 
	 @GetMapping ("/evento/{idEvento}")
	 public List <ReservaDto> porEvento(@PathVariable int idEvento){
		return ReservaDto.converList(rdao.buscarPorEvento(idEvento));
		 
	 }
	 
	 @GetMapping("/usuarioId/{idUsuario}")
	 public List <ReservaDto> porUsuario(@PathVariable int idUsuario){
		return ReservaDto.converList(rdao.buscarPorIdUsuario(idUsuario));
		 
	 }
	 
	 @GetMapping("/usuarioEmail/{email}")
	 public List <ReservaDto> porEmail (@PathVariable String email){
		 return ReservaDto.converList(rdao.buscarPorEmail(email));
	 }
}
