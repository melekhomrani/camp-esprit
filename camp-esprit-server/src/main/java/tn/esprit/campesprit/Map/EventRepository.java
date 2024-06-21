package tn.esprit.campesprit.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;



@Repository
public interface EventRepository extends JpaRepository<Event,Long> {
	
	Event findEventExistById(Long id);
	
	Optional<Event> findEventById(Long id);

	

}
