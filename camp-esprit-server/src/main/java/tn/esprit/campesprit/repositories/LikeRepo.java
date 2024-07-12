package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.Like;

import java.util.List;
import java.util.Optional;

public interface LikeRepo extends JpaRepository<Like, Long> {
    List<Like> findByThreadId(Long threadId);
    boolean existsByUserIdAndThreadId(String userId, Long threadId);

    Optional<Like> findByUserIdAndThread_Id(String userId, Long threadId);

    List<Like> findByUserId(String userId);

}
