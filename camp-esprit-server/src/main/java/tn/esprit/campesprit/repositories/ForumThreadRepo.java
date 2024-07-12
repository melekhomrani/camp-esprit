package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.campesprit.entities.ForumThread;
import tn.esprit.campesprit.entities.User;

import java.util.List;

@Repository
public interface ForumThreadRepo extends JpaRepository<ForumThread, Long> {
    List<ForumThread> findByCreatedBy(User UserId);

}
