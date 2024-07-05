package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
