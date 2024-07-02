package tn.esprit.keycloakstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.keycloakstats.entities.Cred;

import java.util.List;

@Repository
public interface CredRepo extends JpaRepository<Cred, Long> {

    @Query("SELECT c.type, COUNT(c) FROM Cred c GROUP BY c.type")
    List<Object[]> countCredsByType();
}
