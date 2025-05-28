package eventosweb.modelo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import eventosweb.modelo.entities.Destacado;
import eventosweb.modelo.entities.Evento;
import eventosweb.modelo.entities.EstadoEvento;
import eventosweb.modelo.repository.EventoRepository;
@Service

public class EventoDaoImplDataJpa implements EventoDao{

    private final TipolDaoImplDataJpa tipolDaoImplDataJpa;
	@Autowired
	private EventoRepository prepo;

    EventoDaoImplDataJpa(TipolDaoImplDataJpa tipolDaoImplDataJpa) {
        this.tipolDaoImplDataJpa = tipolDaoImplDataJpa;
    }
	@Override
	public List<Evento> todos() {
		// TODO Auto-generated method stub
		return prepo.findAll();
	}

	@Override
	public List<Evento> porNombreContain(String cadena) {
		// TODO Auto-generated method stub
		return prepo.findByNombreContaining(cadena);
	}
	
	@Override
	public List<Evento> porDestacado(String destacado) {
		// TODO Auto-generated method stub
		return prepo.findByDestacado(Destacado.valueOf(destacado));
	}
	
	@Override
	public List<Evento> porEstado(String estado) {
		// TODO Auto-generated method stub
		return prepo.findByEstado(EstadoEvento.valueOf(estado));
	}


	@Override
	public Evento insertOne(Evento evento) {
		try {
			return prepo.save(evento);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Evento buscarUno(Integer idEvento) {
		// TODO Auto-generated method stub
		return prepo.findById(idEvento).orElse(null);
	}

	@Override
	public int eliminar(Integer idEvento) {
		int filas=0;
		if(prepo.existsById(idEvento)) {
			try {
				prepo.deleteById(idEvento);
				filas = 1;
				;
			}catch (Exception e) {
				System.out.println(e.getMessage());
				filas=-1;
			}
		}else
			filas = 0;
		
		return filas;
	}
	
	public int modificar(Evento evento) {
		int filas=0;
		if(prepo.existsById(evento.getIdEvento())) {
			try {
				 prepo.save(evento);
				 filas = 1;
			}catch(Exception e) {
				System.err.println(e.getMessage());
				filas= -1;
		}
			}else 
				filas= 0;
		
		return filas;
	}

}

	

	




