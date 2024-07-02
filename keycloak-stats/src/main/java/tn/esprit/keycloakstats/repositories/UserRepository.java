package tn.esprit.keycloakstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.keycloakstats.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    User getByEmail(String email);
    User getByUsername(String username);

}
