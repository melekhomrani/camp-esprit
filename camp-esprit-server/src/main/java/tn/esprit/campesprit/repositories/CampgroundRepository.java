package tn.esprit.campesprit.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.campesprit.entities.Campground;

@Repository
public interface CampgroundRepository extends JpaRepository<Campground, Long> {
}