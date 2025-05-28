package eventosweb.modelo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.DeleteMapping;

import eventosweb.modelo.entities.Evento;

public interface EventoRepository extends JpaRepository<Evento, Integer>{
	public List<Evento> findByNombreContaining(String cadena);

}
