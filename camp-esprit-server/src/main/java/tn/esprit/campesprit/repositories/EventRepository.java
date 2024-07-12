package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.campesprit.entities.Event;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

}
