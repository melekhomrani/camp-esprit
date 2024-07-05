package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.Tag;

public interface TagRepo extends JpaRepository<Tag, Long> {
}
