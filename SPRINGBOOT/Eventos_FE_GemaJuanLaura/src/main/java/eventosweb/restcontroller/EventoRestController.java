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

import eventosweb.modelo.dao.EventoDao;
import eventosweb.modelo.entities.Evento;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/evento")
public class EventoRestController {
	@Autowired
	private EventoDao edao;
	
	@GetMapping("/todos")
	public List<Evento> todos(){
		return edao.todos();
	}
	
	@GetMapping("/nombre/{cadena}")
	public List<Evento> subcadena(@PathVariable String cadena){
		return edao.porNombreContain(cadena);
	}
	
	@GetMapping("/destacado/{destacado}")
	public List<Evento> destacado(@PathVariable String destacado){
		return edao.porDestacado(destacado);
	}
	
	@GetMapping("/estado/{estado}")
	public List<Evento> estado(@PathVariable String estado){
		return edao.porEstado(estado);
	}
	
	/*
	@GetMapping("/tipo/{tipo}")
	public List<Evento> tipo(@PathVariable Integer tipo){
		return edao.porTipo(tipo);
	}
	*/
	
	@GetMapping("/uno/{idEvento}")
	public Evento uno(@PathVariable Integer idEvento){
		return edao.buscarUno(idEvento);
	}
	
	@PostMapping("/alta")
	public Evento alta(@RequestBody Evento evento) {
	  return edao.insertOne(evento);
	}
	
	 @DeleteMapping("/eliminar/{idEvento}")
	 public Integer Eliminar (@PathVariable int idEvento) {
		 return edao.eliminar(idEvento);
	 }
	 
	 @PutMapping("/modificar")
		public Integer modificar(@RequestBody Evento evento) {
		 return edao.modificar(evento);
		  
		}



}
