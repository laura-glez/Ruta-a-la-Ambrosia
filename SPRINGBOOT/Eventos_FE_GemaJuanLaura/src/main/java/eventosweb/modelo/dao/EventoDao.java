package eventosweb.modelo.dao;

import java.util.List;

import eventosweb.modelo.entities.Evento;

public interface EventoDao {

	List<Evento> todos();
	List<Evento> porNombreContain(String cadena);
	List<Evento> porDestacado(String destacado);
	List<Evento> porEstado(String estado);
	Evento insertOne(Evento evento);
	Evento buscarUno(Integer idEvento);
	int eliminar(Integer idEvento);
	int modificar(Evento evento);
	
}

