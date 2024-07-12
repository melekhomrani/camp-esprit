package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.Amenity;

public interface AmenityRepository extends JpaRepository<Amenity,Long> {
}
