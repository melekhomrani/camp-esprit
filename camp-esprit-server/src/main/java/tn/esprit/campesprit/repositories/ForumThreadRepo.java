package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.ForumThread;

public interface ForumThreadRepo extends JpaRepository<ForumThread, Long> {
}
