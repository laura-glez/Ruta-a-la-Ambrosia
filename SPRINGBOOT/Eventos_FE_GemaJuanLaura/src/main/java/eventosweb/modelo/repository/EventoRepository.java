package eventosweb.modelo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.DeleteMapping;

import eventosweb.modelo.entities.Destacado;
import eventosweb.modelo.entities.EstadoEvento;
import eventosweb.modelo.entities.Evento;

public interface EventoRepository extends JpaRepository<Evento, Integer>{
	public List<Evento> findByNombreContaining(String cadena);
	public List<Evento> findByDestacado(Destacado destacado);
	public List<Evento> findByEstado(EstadoEvento estadoEvento);
}
