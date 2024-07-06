package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.Like;

import java.util.List;

public interface LikeRepo extends JpaRepository<Like, Long> {
    List<Like> findByThreadId(Long threadId);
    boolean existsByUserIdAndThreadId(String userId, Long threadId);
}
