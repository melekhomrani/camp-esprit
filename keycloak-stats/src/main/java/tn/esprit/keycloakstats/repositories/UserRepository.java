package tn.esprit.keycloakstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.keycloakstats.entities.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User getByEmail(String email);
    User getByUsername(String username);
    @Query("SELECT u.emailVerified, COUNT(u) FROM User u group by u.emailVerified")
    List<Object[]> countUsersByEmailVerified();

}
