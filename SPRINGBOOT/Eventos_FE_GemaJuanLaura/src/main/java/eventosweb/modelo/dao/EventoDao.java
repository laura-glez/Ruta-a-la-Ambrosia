package eventosweb.modelo.dao;

import java.util.List;

import eventosweb.modelo.entities.Evento;
import eventosweb.modelo.entities.Tipo;

public interface EventoDao {

	List<Evento> todos();
	List<Evento> porNombreContain(String cadena);
	List<Evento> porDestacado(String destacado);
	List<Evento> porEstado(String estado);
	List<Evento> porTipo(Integer tipo);
	Evento insertOne(Evento evento);
	Evento buscarUno(Integer idEvento);
	int eliminar(Integer idEvento);
	int modificar(Evento evento);
	
}

