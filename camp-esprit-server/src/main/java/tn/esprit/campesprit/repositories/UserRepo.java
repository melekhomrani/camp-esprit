package tn.esprit.campesprit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.campesprit.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity getByEmail(String email);
    UserEntity getByUsername(String username);

}
